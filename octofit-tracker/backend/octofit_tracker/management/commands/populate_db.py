
from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.db import transaction
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Drop collections directly for a clean slate
        self.stdout.write(self.style.WARNING('Dropping MongoDB collections...'))
        client = MongoClient('mongodb://localhost:27017/')
        db = client['octofit_db']
        for collection in ['activity', 'leaderboard', 'user', 'team', 'workout']:
            db[collection].drop()

        with transaction.atomic():
            self.stdout.write(self.style.SUCCESS('Creating teams...'))
            marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
            dc = Team.objects.create(name='DC', description='DC superheroes')

            self.stdout.write(self.style.SUCCESS('Creating users...'))
            users = [
                User.objects.create(email='ironman@marvel.com', username='Iron Man', team=marvel),
                User.objects.create(email='captain@marvel.com', username='Captain America', team=marvel),
                User.objects.create(email='spiderman@marvel.com', username='Spider-Man', team=marvel),
                User.objects.create(email='batman@dc.com', username='Batman', team=dc),
                User.objects.create(email='superman@dc.com', username='Superman', team=dc),
                User.objects.create(email='wonderwoman@dc.com', username='Wonder Woman', team=dc),
            ]

            self.stdout.write(self.style.SUCCESS('Creating workouts...'))
            workouts = [
                Workout.objects.create(name='Pushups', description='Upper body', difficulty='Easy'),
                Workout.objects.create(name='Running', description='Cardio', difficulty='Medium'),
                Workout.objects.create(name='Deadlift', description='Strength', difficulty='Hard'),
            ]

            self.stdout.write(self.style.SUCCESS('Creating activities...'))
            Activity.objects.create(user=users[0], workout=workouts[0], duration_minutes=30, calories_burned=200)
            Activity.objects.create(user=users[1], workout=workouts[1], duration_minutes=45, calories_burned=400)
            Activity.objects.create(user=users[3], workout=workouts[2], duration_minutes=60, calories_burned=600)
            Activity.objects.create(user=users[4], workout=workouts[1], duration_minutes=20, calories_burned=150)

            self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
            Leaderboard.objects.create(user=users[0], score=500, rank=1)
            Leaderboard.objects.create(user=users[1], score=400, rank=2)
            Leaderboard.objects.create(user=users[3], score=350, rank=3)
            Leaderboard.objects.create(user=users[4], score=300, rank=4)

            self.stdout.write(self.style.SUCCESS('Test data populated successfully!'))

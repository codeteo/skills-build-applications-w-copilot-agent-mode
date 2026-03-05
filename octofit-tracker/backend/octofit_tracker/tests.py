from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelSmokeTest(TestCase):
    def test_team_create(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')
    def test_user_create(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(email='test@example.com', username='testuser', team=team)
        self.assertEqual(str(user), 'testuser')
    def test_workout_create(self):
        workout = Workout.objects.create(name='Pushups', description='Pushups desc', difficulty='Easy')
        self.assertEqual(str(workout), 'Pushups')
    def test_activity_create(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(email='test@example.com', username='testuser', team=team)
        workout = Workout.objects.create(name='Pushups', description='Pushups desc', difficulty='Easy')
        activity = Activity.objects.create(user=user, workout=workout, duration_minutes=30, calories_burned=100)
        self.assertIn('testuser', str(activity))
    def test_leaderboard_create(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(email='test@example.com', username='testuser', team=team)
        leaderboard = Leaderboard.objects.create(user=user, score=100, rank=1)
        self.assertIn('testuser', str(leaderboard))

import { useCallback, useEffect, useMemo, useState } from 'react';

function ResourceTablePage({ title, resourcePath }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/${resourcePath}/`;

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError('');

    console.log(`${title} endpoint:`, endpoint);

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log(`${title} data:`, data);

      const normalizedData = Array.isArray(data) ? data : data.results || [];
      setRows(normalizedData);
    } catch (fetchError) {
      console.error(`${title} fetch error:`, fetchError);
      setError(`Failed to load ${resourcePath}.`);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint, resourcePath, title]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return rows;
    }

    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query));
  }, [rows, searchTerm]);

  return (
    <section className="card shadow-sm border-0 app-card">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
          <div>
            <h2 className="h3 fw-bold mb-1">{title}</h2>
            <p className="text-muted mb-0">
              API endpoint:{' '}
              <a className="link-primary link-offset-2" href={endpoint} target="_blank" rel="noreferrer">
                {endpoint}
              </a>
            </p>
          </div>

          <div className="d-flex gap-2">
            <button type="button" className="btn btn-primary" onClick={fetchRows}>
              Refresh
            </button>
          </div>
        </div>

        <form
          className="row g-2 align-items-center mb-3"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="col-md-8">
            <label htmlFor={`${resourcePath}-search`} className="form-label fw-semibold">
              Search {title}
            </label>
            <input
              id={`${resourcePath}-search`}
              type="text"
              className="form-control"
              placeholder={`Filter ${resourcePath}...`}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex align-items-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setSearchTerm('')}>
              Clear
            </button>
          </div>
        </form>

        {loading && <div className="alert alert-info mb-0">Loading {resourcePath}...</div>}

        {!loading && error && (
          <div className="alert alert-warning mb-0">
            <h3 className="h5 mb-1">Welcome to Octokit</h3>
            <p className="mb-1">{error}</p>
            <small className="text-muted">Please make sure the backend is running on port 8000.</small>
          </div>
        )}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col" style={{ width: '70px' }}>
                    #
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Identifier</th>
                  <th scope="col">Preview</th>
                  <th scope="col" style={{ width: '130px' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      Welcome to Octokit. No {resourcePath} available yet.
                    </td>
                  </tr>
                )}

                {filteredRows.map((row, index) => {
                  const key = row.id || row._id || `${resourcePath}-${index}`;
                  const rowName =
                    row.name || row.title || row.username || row.team_name || row.activity_type || 'Untitled';

                  return (
                    <tr key={key}>
                      <th scope="row">{index + 1}</th>
                      <td className="fw-semibold">{String(rowName)}</td>
                      <td>{String(row.id || row._id || 'N/A')}</td>
                      <td className="text-truncate" style={{ maxWidth: '360px' }}>
                        {JSON.stringify(row)}
                      </td>
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setSelectedRow(row)}>
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedRow && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">{title} Details</h3>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedRow(null)} />
                </div>
                <div className="modal-body">
                  <pre className="bg-light p-3 rounded mb-0">{JSON.stringify(selectedRow, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedRow(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" onClick={() => setSelectedRow(null)} />
        </>
      )}
    </section>
  );
}

export default ResourceTablePage;
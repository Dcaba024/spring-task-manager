import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const APP_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost:8080"}/api/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(APP_URL);
      setTasks(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(APP_URL, { title, completed: false });
      setTasks([...tasks, response.data]);
      setTitle("");
      setError("");
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${APP_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      setError("");
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      const response = await axios.put(`${APP_URL}/${id}`, { ...task, completed: !task.completed });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
      setError("");
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <main className="app">
        <header className="app-header">
          <h1>✨ Task Manager</h1>
          <p className="subtitle">Stay organized and get things done</p>
        </header>

        <form onSubmit={createTask} className="task-form">
          <div className="input-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="task-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="add-button"
              disabled={loading || !title.trim()}
            >
              {loading ? "..." : "Add Task"}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <section className="task-list">
          {loading && tasks.length === 0 && (
            <div className="loading">Loading tasks...</div>
          )}

          {tasks.length === 0 && !loading ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks yet</h3>
              <p>Add your first task above to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <button
                    className={`checkbox ${task.completed ? 'checked' : ''}`}
                    onClick={() => toggleComplete(task.id)}
                    disabled={loading}
                  >
                    {task.completed && "✓"}
                  </button>
                  <span className="task-title">
                    {task.title}
                  </span>
                </div>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  disabled={loading}
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </section>

        {tasks.length > 0 && (
          <footer className="app-footer">
            <span className="task-count">
              {tasks.filter(t => !t.completed).length} of {tasks.length} tasks remaining
            </span>
          </footer>
        )}
      </main>
    </div>
  )
}

export default App

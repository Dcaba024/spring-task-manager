import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import App from './App'

vi.mock('axios')

const API_URL = 'http://localhost:8080/api/tasks'

describe('Task Manager app', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    vi.clearAllMocks()

    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Learn testing', completed: false },
        { id: 2, title: 'Ship the UI', completed: true },
      ],
    })

    axios.post.mockResolvedValue({
      data: { id: 3, title: 'Write frontend test', completed: false },
    })
  })

  it('loads and displays tasks from the API', async () => {
    render(<App />)

    expect(screen.getByText('Loading tasks...')).toBeInTheDocument()

    expect(await screen.findByText('Learn testing')).toBeInTheDocument()
    expect(screen.getByText('Ship the UI')).toBeInTheDocument()
    expect(screen.getByText('1 of 2 tasks remaining')).toBeInTheDocument()
    expect(axios.get).toHaveBeenCalledWith(API_URL)
  })

  it('creates a new task from the form', async () => {
    const user = userEvent.setup()
    render(<App />)

    await screen.findByText('Learn testing')

    await user.type(screen.getByPlaceholderText('What needs to be done?'), 'Write frontend test')
    await user.click(screen.getByRole('button', { name: 'Add Task' }))

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(API_URL, {
        title: 'Write frontend test',
        completed: false,
      })
    })

    expect(screen.getByText('Write frontend test')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('What needs to be done?')).toHaveValue('')
  })
})

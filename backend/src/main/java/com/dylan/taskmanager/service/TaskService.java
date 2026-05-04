package com.dylan.taskmanager.service;

import com.dylan.taskmanager.model.Task;
import com.dylan.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Task createTask(Task task) {
        return repository.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {
        return repository.findById(id)
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setDescription(updatedTask.getDescription());
                    task.setCompleted(updatedTask.isCompleted());
                    return repository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(Long id) {
        repository.deleteById(id);
    }
}
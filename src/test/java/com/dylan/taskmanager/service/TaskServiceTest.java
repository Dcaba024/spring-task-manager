package com.dylan.taskmanager.service;

import com.dylan.taskmanager.model.Task;
import com.dylan.taskmanager.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository repository;

    @InjectMocks
    private TaskService service;

    @Test
    void shouldReturnAllTasks() {
        List<Task> mockTasks = List.of(
                new Task("Learn Testing", false),
                new Task("Mock Repository", true)
        );

        when(repository.findAll()).thenReturn(mockTasks);

        List<Task> result = service.getAllTasks();

        assertEquals(2, result.size());
        assertEquals("Learn Testing", result.get(0).getTitle());
    }

    @Test
    void shouldCreateTask() {
        Task task = new Task("Create test task", false);

        when(repository.save(task)).thenReturn(task);

        Task result = service.createTask(task);

        assertEquals("Create test task", result.getTitle());
        assertEquals(false, result.isCompleted());
    }
}
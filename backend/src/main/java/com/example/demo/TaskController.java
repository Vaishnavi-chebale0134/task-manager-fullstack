package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/task")
public class TaskController {
	
	@Autowired
	private TaskRepository repo;
	
	@GetMapping("/getAllTasks")
	
	public Iterable<Task> getTask(){
		return repo.findAll();
	}
	
	@PostMapping("/addTask")
	public String addTask(@RequestBody Task tasks) {
		repo.save(tasks);
		return "Tasks saved";
	}
	
	@PutMapping("/updatetask/{id}")
	public String updateTask(@PathVariable int id,@RequestBody Task updatetask) {
		java.util.Optional<Task> optional = repo.findById(id);
		
	
	if(optional.isPresent()) {
		Task exsiting=optional.get();

		exsiting.setTask_name(updatetask.getTask_name());
		exsiting.setDescription(updatetask.getDescription());
		exsiting.setCompleted(updatetask.isCompleted());
		repo.save(exsiting);
		
		return"Task updated with Id:"+id;
	}else {
		return "Not Found Id with "+id;
	}
	
	}
	
	@DeleteMapping("/deletetask/{id}")
	public String DeleteTask(@PathVariable int id) {
		
		if(repo.existsById(id)) {
			repo.deleteById(id);
			return"Task deleted with this "+id;
		}else {
			return "Task Not Found with this "+id;
		}
		
	}
	
	// for status
	
	@PutMapping("/status/{id}")
	public ResponseEntity<String> AddStatus(@PathVariable int id,@RequestBody Task update_status) {
		Optional<Task> optional = repo.findById(id);
		
		if(optional.isPresent()) {
			Task exsting =optional.get();
			exsting.setStatus(update_status.getStatus());
			repo.save(exsting);
			return ResponseEntity.ok("Status Updated for Id "+id);
		}
		
		return ResponseEntity.ok("Not Found this Id "+id);
	}
	
	
	
	
	
	
	
	
}

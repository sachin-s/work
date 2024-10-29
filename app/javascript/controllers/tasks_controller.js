import { Controller } from "@hotwired/stimulus"
import React from 'react'
import { createRoot } from 'react-dom/client';
import Tasks from '../components/tasks'

// Connects to data-controller="tasks"
export default class extends Controller {

  static values = { map: Object, newTaskUrl: String };

  connect() {
        //this.element.textContent = "Hello World!"
        console.debug("tasks: Hello World!");
        console.debug(this.newTaskUrlValue);
        const app = document.getElementById('app');

        // Convert map to array if necessary
        const tasksArray = Object.values(this.mapValue);

        //pass the tasks to React Tasks component
        createRoot(app).render(<Tasks tasks={tasksArray} />); 
  }
}
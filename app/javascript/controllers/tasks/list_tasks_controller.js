import { Controller } from "@hotwired/stimulus"
import React from 'react'
import { createRoot } from 'react-dom/client';
import Tasks from '../../pages/tasks'
import { number } from "zod";

// Connects to data-controller="tasks--list-tasks"
export default class extends Controller {

  static values = { map: Object, newTaskUrl: String, page: String, nextp: String, prevp: String, lastp: String };

  connect() {
        //this.element.textContent = "Hello World!"
        //console.log('Connected to task list controller!');
        const app = document.getElementById('app');

        // Convert map to array if necessary
        const tasksArray = Object.values(this.mapValue);

        //console.log(this.nextpValue,'-', this.pageValue,'-', this.prevpValue,'-', this.lastpValue);

        //pass the tasks to React Tasks component
        createRoot(app).render(<Tasks tasks={tasksArray} newTaskUrl={this.newTaskUrlValue} page={this.pageValue} nextp={this.nextpValue} prevp={this.prevpValue} lastp={this.lastpValue}  />); 
  }
}
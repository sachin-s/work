import { Controller } from "@hotwired/stimulus"
import React from 'react'
import { createRoot } from 'react-dom/client';
import { CustomAlert } from '../../components/custom-alert';

// Connects to data-controller="utils--header-alert"
export default class extends Controller {
    static values = { notice: String };
    static targets = [ "notice" ]
    connect() {
        //this.element.textContent = "Hello World!"
        console.debug("header-alert: connected!");

        console.log(this.noticeValue)
        if (this.noticeValue && this.noticeValue.trim() !== "")
        {
          const root = document.getElementById('header-alert');
          createRoot(root).render(<CustomAlert title='Notification' description={this.noticeValue} />);    
          setTimeout(() => {
            // Remove or hide the alert (depending on your desired effect)
            root.innerHTML = '';  // Remove the rendered alert from the DOM
            // OR, if you prefer to hide it instead of removing:
            // root.style.display = 'none'; // This hides the alert (make sure your alert can be re-shown)
        }, 10000); 
        }else
        {
          this.noticeTarget.innerHTML = "";
        }
        // Convert map to array if necessary
        //const tasksArray = Object.values(this.mapValue);

        //pass the tasks to React Tasks component
        //createRoot(app).render(<Tasks tasks={tasksArray} newTaskUrl={this.newTaskUrlValue} />); 
  }
} 
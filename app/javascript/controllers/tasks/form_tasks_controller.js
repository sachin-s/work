import { Controller } from "@hotwired/stimulus"
import React from 'react'
import { createRoot } from 'react-dom/client';
import { ProfileForm } from "../../pages/task-form";

// Connects to data-controller="tasks--form-tasks"
export default class extends Controller {

    static values = { url: String, act: String, id: Object, priority: Array, status: Array };

    connect() {
        console.log('Connected to task form controller!');
        const app = document.getElementById('task-form');

        createRoot(app).render(<ProfileForm action={this.actValue} url={this.urlValue} task={this.idValue} priority={this.priorityValue} status={this.statusValue} />);
    }

}
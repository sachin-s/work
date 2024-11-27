import { Controller } from "@hotwired/stimulus"
import React from 'react'
import { createRoot } from 'react-dom/client';
import { ProfileForm } from "../../pages/task-form";

export default class extends Controller {

    connect() {
        console.log('Connected to task form controller!');
        const app = document.getElementById('task-form');

        createRoot(app).render(<ProfileForm />);
    }

}
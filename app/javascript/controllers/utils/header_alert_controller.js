import { Controller } from "@hotwired/stimulus"
import React from 'react'
import { createRoot } from 'react-dom/client';
import { CustomAlert } from '../../components/custom-alert';

// Connects to data-controller="utils--header-alert"
export default class extends Controller {
    static values = { notice: String };
    static targets = [ "notice" ]
    connect() {
        //console.log('Connected to header alert controller!');
        
        if (this.noticeValue && this.noticeValue.trim() !== "")
        {
          const root = document.getElementById('header-alert');
          createRoot(root).render(<CustomAlert title='Notification' description={this.noticeValue} />);    
          setTimeout(() => {
            // Remove or hide the alert (depending on your desired effect)
            root.innerHTML = '';  // Remove the rendered alert from the DOM
        }, 10000); 
        }else
        {
          this.noticeTarget.innerHTML = "";
        }
  }
} 
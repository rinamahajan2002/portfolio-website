const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

// Activate section
function activateSection(id){
  sections.forEach(s=>s.classList.toggle('active-section',s.id===id));
  navLinks.forEach(l=>l.classList.toggle('active',l.dataset.target===id));
  document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  navList.classList.remove('show');
}
navLinks.forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    activateSection(link.dataset.target);
  });
});
hamburger.addEventListener('click',()=>navList.classList.toggle('show'));

// Hire me button
document.getElementById('hire-me')?.addEventListener('click',e=>{
  e.preventDefault();activateSection('contact');
});

// Contact Form
const form=document.getElementById('contact-form');
const status=document.getElementById('form-status');
if(form){
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    status.textContent='Sending...';
    try{
      const data=new FormData(form);
      const res=await fetch('https://formspree.io/f/xrbrzqyo',{method:'POST',body:data,headers:{Accept:'application/json'}});
      if(res.ok){status.textContent='✅ Message sent!';status.style.color='green';form.reset();}
      else{status.textContent='❌ Failed to send.';status.style.color='red';}
    }catch{status.textContent='❌ Network error.';status.style.color='red';}
  });
}

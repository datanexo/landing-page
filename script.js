document.addEventListener('DOMContentLoaded', () => {
  //const btn = document.getElementById('more-btn');
  const moreContent = document.getElementById('third');
  const btn2 = document.getElementById('scrolltotop');
  const btn3 = document.getElementById('hover-target');

btn3.addEventListener('mousedown', () => {
    name=document.getElementById('fname').value.replaceAll(" ", '%20');
    email=document.getElementById('lname').value.replaceAll(" ", '%20');
	console.log(name,email);
     window.location = "https://calendly.com/kevinyoel9/30min?name="+name+"&email="+email;
  });

/*  btn.addEventListener('mousedown', () => {
    moreContent.classList.remove('hidden');
    moreContent.scrollIntoView({ behavior: 'smooth' });
  });  */
btn2.addEventListener('mousedown', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });  });

});




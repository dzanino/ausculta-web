// Scroll-reveal for elements with .reveal (respects reduced motion via CSS)
(function(){
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
  // live-ish BPM ticker in the hero phone
  var bpm=document.getElementById('bpm'),rr=document.getElementById('rr');
  if(bpm){var b=68;setInterval(function(){b+=Math.round((Math.random()-.5)*3);b=Math.max(62,Math.min(76,b));bpm.firstChild.nodeValue=b},1400)}
  if(rr){var r=14;setInterval(function(){r+=Math.random()<.5?-1:1;r=Math.max(12,Math.min(17,r));rr.firstChild.nodeValue=r},3200)}
})();

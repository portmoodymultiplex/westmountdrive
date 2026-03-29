(function() {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  // ── Progress Bar ──
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', function() {
    const d = document.documentElement;
    const pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  // ── Side Nav Visibility ──
  const sidenav = document.getElementById('sidenav');
  const hero = document.getElementById('hero');
  const mobileBtn = document.getElementById('mobile-nav-btn');
  const deadlineRibbon = document.getElementById('deadline-ribbon');

  ScrollTrigger.create({
    trigger: hero,
    start: 'bottom top',
    onEnterBack: function() {
      sidenav.classList.remove('visible');
      mobileBtn.classList.remove('visible');
      deadlineRibbon.classList.remove('visible');
    },
    onLeave: function() {
      sidenav.classList.add('visible');
      mobileBtn.classList.add('visible');
      deadlineRibbon.classList.add('visible');
    }
  });

  // ── Active Nav Link ──
  var navLinks = document.querySelectorAll('.nav-link');
  var navSections = [];
  navLinks.forEach(function(link) {
    var id = link.getAttribute('href').substring(1);
    var el = document.getElementById(id);
    if (el) navSections.push({ el: el, link: link });
  });

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: function() {
      var scrollY = window.scrollY + window.innerHeight * 0.3;
      var active = null;
      navSections.forEach(function(s) {
        if (s.el.offsetTop <= scrollY) active = s;
      });
      navLinks.forEach(function(l) { l.classList.remove('active'); });
      if (active) active.link.classList.add('active');
    }
  });

  // ── Mobile Nav ──
  var mobileNav = document.getElementById('mobile-nav');
  mobileBtn.addEventListener('click', function() {
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      mobileNav.classList.remove('open');
    });
  });

  // ── Smooth Scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── GSAP Reveal Animations ──
  gsap.utils.toArray('.gs-reveal').forEach(function(el) {
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ── Stat Counter Animations ──
  document.querySelectorAll('.counter').forEach(function(el) {
    var target = parseInt(el.getAttribute('data-target'));
    var format = el.getAttribute('data-format');
    var hold = el.getAttribute('data-hold');

    ScrollTrigger.create({
      trigger: el.closest('.stat-screen'),
      start: 'top 60%',
      once: true,
      onEnter: function() {
        var obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: target === 0 ? 0.01 : (target > 1000 ? 2 : 1.2),
          ease: target > 1000 ? 'power2.out' : 'power1.out',
          onUpdate: function() {
            var v = Math.round(obj.val);
            if (format === 'comma') {
              el.textContent = v.toLocaleString();
            } else {
              el.textContent = v;
            }
          }
        });
      }
    });

    // Pin stat screens briefly
    ScrollTrigger.create({
      trigger: el.closest('.stat-screen'),
      start: 'top top',
      end: hold ? '+=300' : '+=180',
      pin: true,
      pinSpacing: true
    });
  });

  // ── Grade Diagram Animation ──
  var gradeEl = document.getElementById('grade-svg');
  if (gradeEl) {
    var gradeLine = gradeEl.querySelector('.grade-line');
    var stairsPath = gradeEl.querySelector('.stairs-path');

    if (gradeLine) {
      gsap.fromTo(gradeLine,
        { opacity: 0 },
        {
          opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: gradeEl,
            start: 'top 75%'
          }
        }
      );
    }
    if (stairsPath) {
      var len = stairsPath.getTotalLength();
      gsap.set(stairsPath, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(stairsPath, {
        strokeDashoffset: 0, duration: 1.5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: gradeEl,
          start: 'top 65%'
        }
      });
    }
  }

  // ── YouTube Hero Video Background ──
  var playerDiv = document.getElementById('hero-video-player');
  if (playerDiv) {
    var ytTag = document.createElement('script');
    ytTag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(ytTag);

    window.onYouTubeIframeAPIReady = function() {
      var heroPlayer = new YT.Player('hero-video-player', {
        videoId: '4veMsoBOGS4',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          start: 30,
          end: 50,
          playsinline: 1
        },
        events: {
          'onReady': function(e) {
            e.target.mute();
            e.target.playVideo();
          },
          'onStateChange': function(e) {
            if (e.data === YT.PlayerState.ENDED) {
              heroPlayer.seekTo(30);
              heroPlayer.playVideo();
            }
          }
        }
      });
    };
  }

})();

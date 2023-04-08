const 
         log = console.log,
toggleSwitch = document.getElementById('dark'),
currentTheme = localStorage.getItem('theme')

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme)
    if (currentTheme === 'light') {
        toggleSwitch.checked = false
    }
}

function switchTheme(e) {
    const color = (e.target.checked) ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', color)
    localStorage.setItem('theme', color)
}

toggleSwitch.addEventListener('change', switchTheme, false)

const emlParser = (encoded) => {
  let 
  decEml   = '' ,
  keyInHex = encoded.substr (0, 2) ,
  key      = parseInt (keyInHex, 16)
  for (let n = 2; 
           n < encoded.length; 
           n += 2
  ) {
      let
      charInHex = encoded.substr (n, 2) ,
      char      = parseInt (charInHex, 16) ,
      output    = char ^ key
      decEml += String.fromCharCode (output)
    }
    return decEml
} 
function emlDecoder() {
 const 
 eml = 
 document.getElementsByClassName("eml")
 for (let i = 0; i < eml.length; i++) {
  let 
  elEml = eml[i] ,
  encoded = elEml.dataset.encoded,
  decoded = emlParser(encoded)
  elEml.href = 'mailto:' + decoded + '?subject=Hi!%20I%20saw%20your%20profile%20on%20GitHub&body=Hi!%20I%20saw%20your%20profile%20on%20GitHub%20and%20'
 }
} emlDecoder()

window.onscroll = function () 
{
    let  nav = document.getElementById('dark') 
    let  top = document.getElementById('goup') 
    let fija = nav.offsetTop
    if (window.pageYOffset > fija) { 
        top.classList.remove("hidden") 
    } else { 
        top.classList.add("hidden") 
    } 
}


const addAnimation = (c, even, odd) => {
  let num = 0
  for (el of c) {
    num++
    el.classList.add('josh-js') 
    el.dataset.joshAnimName = (num % 2) ? even : odd
  }   
}

const timelines = document.getElementsByClassName('timelineUl')
for ( let timeline of timelines ) {
      let time = timeline.getElementsByClassName('time'),
       content = timeline.getElementsByClassName('content')
      addAnimation(time   , 'fadeInRight', 'fadeInLeft' )
      addAnimation(content, 'fadeInLeft' , 'fadeInRight')
}

class Josh {
    constructor(options = {}) {
      this.initClass = options.initClass || "josh-js";
      this.initDom = document.querySelectorAll("." + this.initClass);
      this.animClass = options.animClass || "animate__animated";
      this.offset = options.offset || 0.2;
      this.animateInMobile =
        typeof options.animateInMobile === "undefined"
          ? true
          : options.animateInMobile;
      this.onDOMChange =
        typeof options.onDOMChange === "undefined" ? false : options.onDOMChange;
      this.intersectOnScroll(this.initDom);
      this.callOnDOMChange();
      this.addCss(this.initDom);
    }
    intersectionObserverCallback(entries, observer) {
      const notMobile = !this.animateInMobile && this.isMobile();
      entries.forEach((entry) => {
        const targetElm = entry.target;
        const name = targetElm.dataset.joshAnimName, 
          iteration = targetElm.dataset.joshIteration, 
          duration = targetElm.dataset.joshDuration, 
          delay = targetElm.dataset.joshAnimDelay; 
        if (entry.isIntersecting) {
          let styles = `
            visibility: visible;
            animation-name: ${name};
            animation-duration: ${duration};
            animation-iteration-count: ${iteration};
            animation-delay: ${delay};
          `;
          if (!notMobile) {
            targetElm.style = targetElm.style.cssText + styles;
          }
          observer.unobserve(targetElm);
        }
      });
    }
    addCss(targetElm) {
      if (targetElm.length > 0) {
        targetElm.forEach((elm) => {
          this.cssUtil(elm);
        });
      } else {
        this.cssUtil(targetElm);
      }
    }
    cssUtil(targetNode) {
      const notMobile = !this.animateInMobile && this.isMobile();
      targetNode.classList.add(this.animClass);
      if (!notMobile) {
        targetNode.style = targetNode.style.cssText + "visibility: hidden";
      }
    }
    intersectOnScroll(domElement) {
      if ("IntersectionObserver" in window) {
        const intetsectObserver = new IntersectionObserver(
          this.intersectionObserverCallback.bind(this),
          {
            root: null,
            rootMargin: "0px",
            threshold: this.offset,
          }
        );
        if (domElement.length > 0) {
          domElement.forEach((animItem) => {
            intetsectObserver.observe(animItem);
          });
        } else {
          intetsectObserver.observe(domElement);
        }
      } else {
        throw new Error(
          "IntersectionObserver is not support by this browser. Try by adding pollyfil or use other library."
        );
      }
    }
    callOnDOMChange() {
      window.addEventListener("DOMContentLoaded", () => {
        if (this.onDOMChange) {
          const domChangeObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              const newNodes = mutation.addedNodes; 
              if (newNodes !== null) {
                newNodes.forEach((node) => {
                  this.addCss(node);
                  this.intersectOnScroll(node);
                });
              }
            });
          });
          const config = {
            childList: true,
            subtree: true,
          };
          domChangeObserver.observe(document.body, config);
        }
      });
    }
    isMobile() {
      return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
  }
  const josh = new Josh()
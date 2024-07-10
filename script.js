document.getElementById('upload').addEventListener('change', handleFileUpload);
document.getElementById('heartShape').addEventListener('click', () => transformImage('heart'));
document.getElementById('squareShape').addEventListener('click', () => transformImage('square'));
document.getElementById('circleShape').addEventListener('click', () => transformImage('circle'));
document.getElementById('customShape').addEventListener('click', () => transformImage('custom'));
document.getElementById('download').addEventListener('click', downloadImage);

let originalImage = document.getElementById('originalImage');
let transformedCanvas = document.getElementById('transformedImage');
let ctx = transformedCanvas.getContext('2d');

function handleFileUpload(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            originalImage.src = e.target.result;
            originalImage.onload = function() {
                transformedCanvas.width = originalImage.width;
                transformedCanvas.height = originalImage.height;
                ctx.drawImage(originalImage, 0, 0);
            }
        }
        reader.readAsDataURL(file);
    }
}

function transformImage(shape) {
    ctx.clearRect(0, 0, transformedCanvas.width, transformedCanvas.height);
    ctx.drawImage(originalImage, 0, 0);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();

    switch(shape) {
        case 'heart':
            drawHeart(ctx, transformedCanvas.width / 2, transformedCanvas.height / 2, Math.min(transformedCanvas.width, transformedCanvas.height) / 2);
            break;
        case 'square':
            ctx.rect(0, 0, transformedCanvas.width, transformedCanvas.height);
            break;
        case 'circle':
            ctx.arc(transformedCanvas.width / 2, transformedCanvas.height / 2, Math.min(transformedCanvas.width, transformedCanvas.height) / 2, 0, 2 * Math.PI);
            break;
        case 'custom':
            // Custom shape logic
            break;
    }

    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
}

function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + size / 2, y - size / 2, x + size, y + size / 4, x, y + size);
    ctx.bezierCurveTo(x - size, y + size / 4, x - size / 2, y - size / 2, x, y);
    ctx.fill();
}

function downloadImage() {
    let link = document.createElement('a');
    link.download = 'transformed.png';
    link.href = transformedCanvas.toDataURL();
    link.click();
}
/*===== EXPANDER MENU  =====*/ 
const showMenu = (toggleId, navId)=>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
  
    if(toggle && nav){
      toggle.addEventListener('click', ()=>{
        nav.classList.toggle('show')
        toggle.classList.toggle('bx-x')
      })
    }
  }
  showMenu('header-toggle','nav-menu')

  /*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');   

function linkAction(){
  /*Active link*/
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');
}
navLink.forEach(n => n.addEventListener('click', linkAction));
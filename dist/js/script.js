const nextBtn=document.querySelectorAll(".next"),formBlock=document.querySelectorAll(".shipping"),wrapper=document.querySelector(".form__wrapper"),inner=document.querySelector(".slides__inner"),width=window.getComputedStyle(inner).width;let offset=0;inner.style.width=100*formBlock.length+"%",inner.style.transition="0.5s all",inner.style.display="flex",wrapper.style.overflow="hidden",formBlock.forEach((e=>{e.style.width=width})),nextBtn.forEach(((e,t)=>{e.addEventListener("click",(()=>{offset===+width.slice(0,width.length-2)*(formBlock.length-1)?offset=0:offset+=+width.slice(0,width.length-2),formBlock[t+1].classList.remove("hidden"),inner.style.transform=`translateX(-${offset}px)`}))}));
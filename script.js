const stars = document.getElementById("stars");

function makeStars(){
  stars.innerHTML = "";
  const count = innerWidth < 700 ? 150 : 260;
  for(let i=0;i<count;i++){
    const s=document.createElement("i");
    s.className="star";
    const z=Math.random()*2+1;
    s.style.cssText=`width:${z}px;height:${z}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${2+Math.random()*4}s;animation-delay:${Math.random()*4}s`;
    stars.appendChild(s);
  }
}
makeStars();

let resizeTimer;
addEventListener("resize",()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(makeStars,180);
});

const heart=document.getElementById("heart");
const intro=document.getElementById("intro");
const reveal=document.getElementById("reveal");

heart.addEventListener("click",()=>{
  if(reveal.classList.contains("show")) return;

  const r=heart.getBoundingClientRect();
  const cx=r.left+r.width/2;
  const cy=r.top+r.height/2;

  heart.animate(
    [
      {transform:"scale(1)",opacity:1},
      {transform:"scale(1.55)",opacity:1},
      {transform:"scale(.1)",opacity:0}
    ],
    {
      duration:650,
      easing:"cubic-bezier(.2,.8,.2,1)",
      fill:"forwards"
    }
  );

  const small = innerWidth < 700;
  const count = small ? 180 : 320;
  const maxTravel = Math.min(
    Math.max(innerWidth, innerHeight) * (small ? .58 : .75),
    small ? 520 : 1100
  );

  for(let i=0;i<count;i++){
    const glyph=i%12===0;
    const e=document.createElement(glyph?"span":"i");
    e.className=glyph?"glyph":"spark";

    if(glyph) e.textContent=i%24===0?"♡":"✦";

    const size=glyph?10+Math.random()*12:1+Math.random()*3;
    e.style.left=cx+"px";
    e.style.top=cy+"px";
    e.style.width=size+"px";
    e.style.height=size+"px";

    document.body.appendChild(e);

    const a=Math.random()*Math.PI*2;
    const d=90+Math.random()*maxTravel;
    const x=Math.cos(a)*d;
    const y=Math.sin(a)*d;

    const an=e.animate(
      [
        {
          transform:"translate(-50%,-50%) scale(1)",
          opacity:1
        },
        {
          transform:`translate(-50%,-50%) translate(${x}px,${y}px) rotate(${Math.random()*180-90}deg) scale(0)`,
          opacity:0
        }
      ],
      {
        duration:1600+Math.random()*1500,
        easing:"cubic-bezier(.16,.7,.3,1)",
        fill:"forwards"
      }
    );

    an.onfinish=()=>e.remove();
  }

  setTimeout(()=>intro.classList.add("hide"),420);
  setTimeout(()=>{
    reveal.classList.add("show");
    reveal.setAttribute("aria-hidden","false");
  },650);
});

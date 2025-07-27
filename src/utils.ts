import { gsap } from 'gsap'
import { VueElement, type VNode, createApp } from 'vue'

function animateNode(ref: any, name: string) {
    let classList = ref.classList
    if(classList){
        if('animateClasses' in ref){
            let clss:any = ref.animateClasses
            classList.remove(...clss)
            ref.animateClasses = []
        }

        if(!classList.contains('animate__animated')){
            classList.add('animate__animated')
        }
        let animate_class = `animate__${name}`
        if(!('animateClasses' in ref))
            ref.animateClasses = []
        ref.animateClasses.push(animate_class)
        classList.add(animate_class)

    }
}

function hideNode(ref:any){
    ref = ref.$el ? ref.$el : ref
    gsap.set(ref, {opacity: 0})
}

function animateNodeEntrance(ref:any, name:string){
    ref = ref.$el ? ref.$el : ref

    gsap.set(ref, {opacity: 1, onComplete:()=>{
        animateNode(ref, name)
    }})
}

function animateNodeExit(ref:any, name:string){
    ref = ref.$el ? ref.$el : ref
    animateNode(ref, name)
    setTimeout(()=>{
        hideNode(ref)
    }, 500)
}

function numberToOrdinal(num:number) {
    if (num % 10 === 1 && num % 100 !== 11) {
        return num + "st";
    } else if (num % 10 === 2 && num % 100 !== 12) {
        return num + "nd";
    } else if (num % 10 === 3 && num % 100 !== 13) {
        return num + "rd";
    } else {
        return num + "th";
    }
}

function findNodeByContentAndTag(content:string, tagName:string = 'span', parent:any = document){
  const targetText = content;
  const allSpans = document.getElementsByTagName(tagName);

  // 遍历查找匹配的节点
  for (let i = 0; i < allSpans.length; i++) {
    const spanNode:any = allSpans[i];
    if (spanNode.textContent.trim() === targetText) {
      // 找到目标节点，执行替换
      return spanNode
    }
  }
  return null
}

function replaceNodeWithComponent(oldNode: VueElement, newNode: VNode) {
    const tempContainer = document.createElement('div');
    const app = createApp({
        render(){
            return newNode
        }
    });
    app.mount(tempContainer);
    let newDom = tempContainer.firstChild!
    // newDom.classList.add('flex flex-row items-center')
    oldNode.parentNode!.replaceChild(newDom, oldNode);
    return newDom
}

export { animateNode, hideNode, animateNodeEntrance, numberToOrdinal, findNodeByContentAndTag, replaceNodeWithComponent, animateNodeExit}

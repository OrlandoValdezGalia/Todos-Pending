(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const C=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <!-- selected -->\r
                <a class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let y;const L=new Uint8Array(16);function S(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(L)}const l=[];for(let e=0;e<256;++e)l.push((e+256).toString(16).slice(1));function P(e,t=0){return l[e[t+0]]+l[e[t+1]]+l[e[t+2]]+l[e[t+3]]+"-"+l[e[t+4]]+l[e[t+5]]+"-"+l[e[t+6]]+l[e[t+7]]+"-"+l[e[t+8]]+l[e[t+9]]+"-"+l[e[t+10]]+l[e[t+11]]+l[e[t+12]]+l[e[t+13]]+l[e[t+14]]+l[e[t+15]]}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:E};function A(e,t,i){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const s=e.random||(e.rng||S)();if(s[6]=s[6]&15|64,s[8]=s[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=s[o];return t}return P(s)}class h{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},d={todos:[new h("Piedra del alma"),new h("Piedra del infinito"),new h("Piedra del tiempo"),new h("Piedra del poder"),new h("Piedra del realidad")],filter:c.All},I=()=>{T()},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));d.todos=e,d.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(d))},k=(e=c.All)=>{switch(e){case c.All:return[...d.todos];case c.Completed:return d.todos.filter(t=>t.done);case c.Pending:return d.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},D=e=>{if(!e)throw new Error("Description is required.");d.todos.push(new h(e)),f()},U=e=>{d.todos=d.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},x=e=>{d.todos=d.todos.filter(t=>t.id!==e),f()},F=e=>{d.todos=d.todos.filter(t=>!t.done),f()},O=(e=c.All)=>{d.filter=e,f()},q=()=>d.filter,a={addTodo:D,deleteCompleted:F,deleteTodo:x,getCurrentFilter:q,getTodo:k,initStore:I,loadStore:T,setFilter:O,toggleTodo:U},M=e=>{if(!e)throw new Error("A TODO object is required.");const{done:t,description:i,id:s}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${t?"checked":""}>
            <label>${i}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",s),e.done&&n.classList.add("completed"),n};let w;const N=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error(`Element ${e} not found.`);w.innerHTML=a.getTodo(c.Pending).length};let g;const H=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(i=>{g.append(M(i))})},V={BtnDestroy:"destroy",DeletedCompleted:"clear-completed",Filter:{All:"All",Completed:"Completed",Pending:"Pending"}},m={TodoList:".todo-list",NewTodoInput:"#new-todo-input",CleaerCompleted:".clear-completed",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{const r=a.getTodo(a.getCurrentFilter());H(m.TodoList,r),i()},i=()=>{N(m.PendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=C,document.querySelector(e).append(r),t()})();const s=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.CleaerCompleted),p=document.querySelectorAll(m.TodoFilters);s.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(a.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const u=r.target.closest("[data-id]");a.toggleTodo(u.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const u=r.target.closest("[data-id]");u&&(r.target.className===V.BtnDestroy&&a.deleteTodo(u.getAttribute("data-id")),t())}),n.addEventListener("click",r=>{a.deleteCompleted(),t()}),p.forEach(r=>{r.addEventListener("click",u=>{switch(p.forEach(v=>v.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":a.setFilter(c.All);break;case"Pendientes":a.setFilter(c.Pending);break;case"Completados":a.setFilter(c.Completed);break}t()})})};a.initStore();R("#app");

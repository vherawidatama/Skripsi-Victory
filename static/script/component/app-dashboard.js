class AppDashboard extends HTMLElement {
    connectedCallback(){
        this.render();
    }
  
    render() {
  this.innerHTML = `
  <header class="masthead">
  <div class="container px-4 px-lg-5 h-100">
      <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
          <div class="col-lg-8 align-self-end">
              <h1 class="text-white font-weight-bold">Library Assistant</h1>
              <hr class="divider" />
          </div>
          <div class="col-lg-8 align-self-baseline">
              <p class="text-white-75 mb-5">Helping you find the best book you should be reading!</p>
              <a class="btn btn-primary btn-xl" href="/key">Find Your Books</a>

          </div>
      </div>
  </div>
</header>
  `
    }
 }

 customElements.define("app-dashboard", AppDashboard);
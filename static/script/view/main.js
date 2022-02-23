/*!
* Start Bootstrap - Creative v7.0.5 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 
// import DataSource from '../data/data-source.js';

const main = () => {

    console.log("asdasd");
    // Navbar shrink function
    const navbarShrink = () => {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    // navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);



    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map((responsiveNavItem) => {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });



    const keywordsElement = document.querySelector("#inputKeywords");
    
    const buttonSearchElement = document.querySelector("#submitButton");

    const onButtonSearchClicked =  () => {
        const dataSource = new DataSource(renderResult, fallbackResult);
        // console.log(nameElement.value);
        // console.log(nimElement.value);
        //console.log(keywordsElement.value);
        
        dataSource.searchBook(searchElement.value);
    };

    var renderResult = function (results) {
        clubListElement.innerHTML = "";
        results.forEach(function (club) {
            var name = club.name;
            var fanArt = club.fanArt;
            var description = club.description;

            var clubElement = document.createElement("div");
            clubElement.setAttribute("class", "club");

            clubElement.innerHTML = '<img class="fan-art-club" src="' + fanArt + '" alt="Fan Art">\n' +
                '<div class="club-info">\n' +
                '<h2>' + name + '</h2>\n' +
                '<p>' + description + '</p>' +
                '</div>';
            clubListElement.appendChild(clubElement);
        })
    };

    var fallbackResult = function (message) {
        clubListElement.innerHTML = "";
        clubListElement.innerHTML += '<h2 class="placeholder">' + message + '</h2>'
    };

    buttonSearchElement.addEventListener("click", onButtonSearchClicked);

};

export default main;
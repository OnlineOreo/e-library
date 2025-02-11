//-- ---------------------- nav dropdown js--------------------------- --


const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".nav_dropdown");
// const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");

function setAriaExpandedFalse() {
    dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
    dropdown.forEach((drop) => {
        drop.classList.remove("active");
        drop.addEventListener("click", (e) => e.stopPropagation());
    });
}

function toggleHamburger() {
    navMenu.classList.toggle("show");
}

dropdownBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const dropdownIndex = e.currentTarget.dataset.dropdown;
        const dropdownElement = document.getElementById(dropdownIndex);
        let icon = e.currentTarget.querySelector('i');
        // icon.classList.remove('fa-angle-down');
        // console.log(e.currentTarget.querySelector('i'));
        var all_angle = document.querySelectorAll('.fa-angle-up')
        all_angle.forEach(up_icon => {
            up_icon.classList.remove('fa-angle-up');
            up_icon.classList.add('fa-angle-down');
        })
        icon.classList.remove('fa-angle-up');
        icon.classList.add('fa-angle-up');

        dropdownElement.classList.toggle("active");
        dropdown.forEach((drop) => {
            if (drop.id !== btn.dataset["dropdown"]) {
                drop.classList.remove("active");
            }
        });
        e.stopPropagation();
        btn.setAttribute(
            "aria-expanded",
            btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
        );
    });
});

// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
    link.addEventListener("click", () => {
        closeDropdownMenu();
        setAriaExpandedFalse();
        toggleHamburger();
    })
);

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeDropdownMenu();
        setAriaExpandedFalse();
    }
});

// toggle hamburger menu
// hamburgerBtn.addEventListener("click", toggleHamburger);



// // ---------------------light color of primary ---------------------------- 

// function lightenColor(hex, percent) {
//     let r = parseInt(hex.substring(1, 3), 16);
//     let g = parseInt(hex.substring(3, 5), 16);
//     let b = parseInt(hex.substring(5, 7), 16);

//     r = parseInt(r * (100 + percent) / 100);
//     g = parseInt(g * (100 + percent) / 100);
//     b = parseInt(b * (100 + percent) / 100);

//     r = (r < 255) ? r : 255;
//     g = (g < 255) ? g : 255;
//     b = (b < 255) ? b : 255;

//     return "#" + (r.toString(16).padStart(2, '0')) + (g.toString(16).padStart(2, '0')) + (b.toString(16).padStart(2, '0'));
// }

// //----------------- hex to rgb color change -------------------
// function hexToRgba(hex, opacity) {
//     hex = hex.replace(/^#/, '');
//     if (hex.length === 3) hex = hex.split('').map(h => h + h).join('');
//     const r = parseInt(hex.substring(0, 2), 16);
//     const g = parseInt(hex.substring(2, 4), 16);
//     const b = parseInt(hex.substring(4, 6), 16);
//     return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// }



// {{-- ---------------------- publisher crousel ------------------- --}}

$(document).ready(function () {
    var $carousel = $('.publish-carousel');

    $('.publish-carousel').slick({
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 800,
        dots: true,
        centerMode: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,

            }

        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,
                infinite: true,

            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
            }
        }]
    });

    // Pause the carousel on hover and resume on mouse leave
    // $('.publish-carousel').on('mouseenter', function() {
    //     $(this).slick('slickPause');
    // }).on('mouseleave', function() {
    //     $(this).slick('slickPlay');
    // });
});

// {{-- ---------------------- book crousel -------------------------  --}}
$(document).ready(function () {
    var $carousel = $('.book-wrapper');

    $('.book-wrapper').slick({
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 800,
        dots: true,
        centerMode: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,

            }

        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,
                infinite: true,

            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 2000,
            }
        }]
    });
    // $('.trending-book-crousel').slick({
    //     speed: 500,
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 800,
    //     dots: true,
    //     centerMode: true,
    //     responsive: [{
    //         breakpoint: 1024,
    //         settings: {
    //             slidesToShow: 3,
    //             slidesToScroll: 1,
    //             centerMode: true,

    //         }

    //     }, {
    //         breakpoint: 800,
    //         settings: {
    //             slidesToShow: 2,
    //             slidesToScroll: 2,
    //             dots: true,
    //             infinite: true,

    //         }
    //     }, {
    //         breakpoint: 480,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1,
    //             dots: true,
    //             infinite: true,
    //             autoplay: true,
    //             autoplaySpeed: 2000,
    //         }
    //     }]
    // });
});

// {{-- ------------------  staff pick section script ---------------------  --}}
$(document).ready(function () {
    $("#ebook").click(function () {
        $("#sp_ebook_div").show();
        $("#sp_ejournals_div").hide();
        $("#sp_video_div").hide();
        $("#ebook").addClass('sp_active');
        $("#ejournals").removeClass('sp_active');
        $("#video").removeClass('sp_active');
    })
    $("#ejournals").click(function () {
        $("#sp_ebook_div").hide();
        $("#sp_ejournals_div").show();
        $("#sp_video_div").hide();
        $("#ebook").removeClass('sp_active');
        $("#ejournals").addClass('sp_active');
        $("#video").removeClass('sp_active');
    })
    $("#video").click(function () {
        $("#sp_ebook_div").hide();      
        $("#sp_ejournals_div").hide();
        $("#sp_video_div").show();
        $("#ebook").removeClass('sp_active');
        $("#ejournals").removeClass('sp_active');
        $("#video").addClass('sp_active');
    })
})


// // {{-- -------------------------  news two script ----------------------- --}}

// async function getNews(category) {
//     var ccurl = window.location.href;
//     document.querySelector('#news_cards_show_div').innerHTML = `
//             <img src="${ccurl}landingPageAsset/img/loader.gif" alt="" style="width: 100px;height:100px;">`;

//     const url = `https://newsdata.io/api/1/news?apikey=pub_53304759241ce0f99f1b96b1389ddba1f91fc&q=${category}`;

//     const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

//     try {
//         await delay(500); 

//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }

//         const json = await response.json();
//         console.log(json.results);

//         let all_news = '';
//         const news = json.results;

//         // Limit to 6 news items with images
//         let count = 0;
//         for (let i in news) {
//             // Check if image_url is present and title/description are not null
//             if (news[i].image_url != null && count < 6) {
//                 const title = news[i].title ? news[i].title.slice(0, 90) + "..." : "No title available";
//                 const description = news[i].description ? news[i].description.slice(0, 200) + "..." :
//                     "No description available";

//                 count++;
//                 all_news += `
//                     <div class="news-card">
//                         <a href="${news[i].link}" class="news-card__card-link" target="_blank"></a>
//                         <img src="${news[i].image_url}" alt="News Image" class="news-card__image">
//                         <div class="news-card__text-wrapper">
//                             <h3 class="news-card__title">${title}</h3>
//                             <div class="news-card__post-date">${new Date(news[i].pubDate).toLocaleDateString()}</div>
//                             <div class="news-card__details-wrapper">
//                                 <p class="news-card__excerpt">${description}</p>
//                                 <a href="${news[i].link}" target="_blank" class="news-card__read-more">
//                                     Read more <i class="fas fa-long-arrow-alt-right"></i>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>`;
//             }
//         }

//         document.querySelector('#news_cards_show_div').innerHTML = all_news;

//     } catch (error) {
//         console.log('Error fetching news:', error);

//         document.querySelector('#news_cards_show_div').innerHTML = `
//          <img src="${ccurl}landingPageAsset/img/loader.gif" alt="" style="width: 100px;height:100px;">`;
//     }
// }

// getNews('geopolitics')


// $(document).ready(function () {
//     $("#geopolitics_news").click(function () {
//         $("#geopolitics_news").addClass('news_nav_active');
//         $("#science_news").removeClass('news_nav_active');
//         $("#business_news").removeClass('news_nav_active');
//         $("#health_news").removeClass('news_nav_active');
//         $("#technology_news").removeClass('news_nav_active');
//         $("#sport_news").removeClass('news_nav_active');
//     })
//     $("#science_news").click(function () {
//         $("#geopolitics_news").removeClass('news_nav_active');
//         $("#science_news").addClass('news_nav_active');
//         $("#business_news").removeClass('news_nav_active');
//         $("#health_news").removeClass('news_nav_active');
//         $("#technology_news").removeClass('news_nav_active');
//         $("#sport_news").removeClass('news_nav_active');
//     })
//     $("#business_news").click(function () {
//         $("#geopolitics_news").removeClass('news_nav_active');
//         $("#science_news").removeClass('news_nav_active');
//         $("#business_news").addClass('news_nav_active');
//         $("#health_news").removeClass('news_nav_active');
//         $("#technology_news").removeClass('news_nav_active');
//         $("#sport_news").removeClass('news_nav_active');
//     })
//     $("#health_news").click(function () {
//         $("#geopolitics_news").removeClass('news_nav_active');
//         $("#science_news").removeClass('news_nav_active');
//         $("#business_news").removeClass('news_nav_active');
//         $("#health_news").addClass('news_nav_active');
//         $("#technology_news").removeClass('news_nav_active');
//         $("#sport_news").removeClass('news_nav_active');
//     })
//     $("#technology_news").click(function () {
//         $("#geopolitics_news").removeClass('news_nav_active');
//         $("#science_news").removeClass('news_nav_active');
//         $("#business_news").removeClass('news_nav_active');
//         $("#health_news").removeClass('news_nav_active');
//         $("#technology_news").addClass('news_nav_active');
//         $("#sport_news").removeClass('news_nav_active');
//     })
//     $("#sport_news").click(function () {
//         $("#geopolitics_news").removeClass('news_nav_active');
//         $("#science_news").removeClass('news_nav_active');
//         $("#business_news").removeClass('news_nav_active');
//         $("#health_news").removeClass('news_nav_active');
//         $("#technology_news").removeClass('news_nav_active');
//         $("#sport_news").addClass('news_nav_active');
//     })
// })











// abhinav code
// $(document).ready(function(){
//     var pub_remote = document.querySelector('.pub_remote');
//     console.log(pub_remote);
//     var uri = pub_remote.getAttribute('forward');
//     // alert('document.ready');    
//     pub_remote.addEventListener('click', memory_handler)
//     function memory_handler()
//     {
//         $.ajax({
//             url:'/memorize?uri='+btoa(uri),   
//             method:'GET',
//             success: function(response){
//             }
//         })
//     }
// });


// $(document).ready(function (){
//     var form = document.getElementById('search_form');
//     var btn = form.querySelector('button');
//     btn.addEventListener('mouseover', function(){
//         console.log('button got clicked');
//         const formData = new FormData(form);

//         const dataObject = {};
//         formData.forEach((value, key) => {
//             dataObject[key] = value;
//         });

//         console.log(dataObject);

//         $.ajax({
//             url : `/memorize_search?filter_type=${dataObject['filter_type']}&search_text=${dataObject['search_text']}`,
//             method : 'GET',
//             // data : {
//             //     formData : dataObject
//             // },
//             success: function(response){
//                 console.log("resposne", response);
//             }
//         });
        
//     });
// });

// $(document).ready(function(){
//     var read_all_news = document.getElementById('read_all_news');

//     read_all_news.addEventListener('mouseover', () => {
//         href = read_all_news.href;
//         href = href.substr(href.search('/search_news'), href.length);
//         // console.log(href);
//         $.ajax({
//             url: `/memorize?uri=${btoa(href)}`,
//             method: 'GET',
//             success: function (response){
//                 console.log("response", response);
//             }
//         })
//     });


// });

import {scroll} from './scroll';

const Handlebars = require('handlebars');
const Masonry = require('masonry-layout');

const main = document.querySelector('.main');
const hideOpts = ['left', 'right', 'top', 'bottom'];
const clostBtn = document.querySelector('.close');

let msnry, projectsJson, tpl, currentProject, stage;

const AFS = (function() {

    function init() {
        getProjectsJson();
        msnry = new Masonry( main, {
            itemSelector: '.item',
            columnWidth: '.sizer',
            transitionDuration: 0,
            percentPosition: true,
        });

        msnry.once('layoutComplete', function(els){
            els.forEach(function(el){
                activateEl(el.element);
            });
        });
        msnry.layout();
        tpl = Handlebars.compile(document.querySelector('#projects-template').innerHTML);
        stage = document.querySelector('.stage');
        clostBtn.addEventListener('click', hideStage);
        window.addEventListener('scroll', handleScroll);
    };

    function hideStage() {
        document.body.classList.remove('item-show');
        stage.removeChild(stage.querySelector('.featured'));
        stage.style.height = 0;
    };

    function handleScroll(e) {
        if (this.scrollY >= 70) {
            clostBtn.classList.add('stuck');
        } else {
            clostBtn.classList.remove('stuck');
        }
    };

    function activateEl(el) {
        if (el.classList.contains('project')) {
            if (el.classList.contains('brd')) {
                el.classList.add(`hide-bottom`);
            } else {
                let hiddenClassToAdd = hideOpts[Math.floor(Math.random() * hideOpts.length)];
                el.classList.add(`hide-${hiddenClassToAdd}`);
            }
            el.addEventListener('click', showProject);
        }
        el.classList.add('show');
    };

    function getProjectsJson() {
        const req = new XMLHttpRequest();
        req.overrideMimeType('application/json');
        req.open('GET', '/projects.json', true);
        req.addEventListener('readystatechange', function(){
            if (this.readyState === 4 && this.status === 200) {
                projectsJson = JSON.parse(this.responseText);
            }
        });

        req.send(null);
    };

    function showProject(e) {
        const selectedProject = e.currentTarget.dataset.project;
        if (!projectsJson || selectedProject === currentProject) return;
        scroll(0, 20);
        currentProject = selectedProject;
        const projData = projectsJson[selectedProject];
        const projectDom = tpl(projData);
        stage.innerHTML = projectDom;
        const featuredImages = stage.querySelectorAll('img');
        document.body.classList.add('item-show');

        /**
        * HOLY FUCK THIS IS FUCKING INSANITY
        * But need a way to listen for each image to load so height isnt an incorrect value :/
        */
        let loaded = 0,
            imgsNeeded = featuredImages.length;
        function addImgComplete() {
            loaded++;
            if (loaded >= imgsNeeded) {
                setHeight();
            }
        }
        featuredImages.forEach(function(img){
            if (img.complete) {
                addImgComplete();
            } else {
                img.addEventListener('load', addImgComplete);
                img.addEventListener('error', addImgComplete);
            }
        });
    };

    function setHeight() {
        const height = document.querySelector('.featured').clientHeight;
        stage.style.height = `${height}px`;
    };

    return {
        init: init
    };

})();

document.addEventListener('DOMContentLoaded', AFS.init);



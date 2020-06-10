$(function() {
    function startIntro() {
        intro = introJs();
        intro.setOptions({
            exitOnOverlayClick: false,
            showStepNumbers: false,
            showBullets: false,
            nextLabel: "Próximo",
            prevLabel: "Anterior",
            skipLabel: "Sair",
            doneLabel: "Fim",
            disableInteraction: true,
            steps: passosAjuda,
        }).onbeforechange(function(targetElement) {
            var ultimoItemAjuda = this._introItems.length - 1;
            switch (this._currentStep) {
                case ultimoItemAjuda:
                    $('.introjs-nextbutton').css({
                        display: 'none'
                    });
                    $(".introjs-skipbutton").addClass("pull-right");
                    break;
                default:
                    $('.introjs-nextbutton').css({
                        display: 'inline-block'
                    });
                    break;
            }
        }).oncomplete(function() {});
        intro.start();
    }
    $("#btAjuda").on("click", function(e) {
        e.preventDefault();
        startIntro();
    });

});

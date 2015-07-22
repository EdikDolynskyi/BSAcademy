function Model(object){
    this.name = object.name;
    this.age = object.age;
    this.year = object.year;
    this.changed = false;
    this.examsTaken = object.examsTaken;
    this.takeExam = object.takeExam;
}

function Controller(modelObject){
    this.model = modelObject.model;
    this.elementId = modelObject.elementId;
    this.render = modelObject.render;
    this.updateExams = modelObject.updateExams;
    this.clickHandlers = modelObject.clickHandlers;
    this.view();
    this.checkChanges();
}

Controller.prototype.checkChanges = function(){
    var self = this;
    setInterval(function(){
        if (self.model.changed){
            self.view(self.render());
            self.model.changed = false;
        }
    }, 100);
};

Controller.prototype.view = function(){
    var self = this;
    var str = this.render();
    var id = '#' + this.elementId;
    if (!$(id).length) {
        $('body').append('<div id="' + this.elementId + '"></div>');

    }
    $(id).html(str);

    for (var key in this.clickHandlers) {
        var handler = this.clickHandlers[key];
        $(key).click(function(){self[handler]()});
    }
};
$(function () {
    var form = new Form();
    var list = new List();

    function Item(name) {
        var self = this;
        this.id = Date.now();
        this.name = name;
        this.isChecked = false;

        this.$chbox = $('<span>', {class: 'chbox glyphicon glyphicon-unchecked'}).click(function () {
            list.toggleCheck(self.id);
        });
        this.$name = $('<span>', {class: 'item-name', text: name}).dblclick(function () {
            form.edit(self.id);
        });
        var $remove = $('<button class="item-close close"><span>×</span></button>').click(function () {
            list.remove(self.id);
        });
        this.$root = $('<li>', {id: this.id, class: 'list-group-item'})
            .append(this.$chbox)
            .append(this.$name)
            .append($remove);
    }

    Item.prototype.setChecked = function (isChecked) {
        this.isChecked = isChecked;
        this.$name.toggleClass('text-muted strike', isChecked);
        this.$chbox
            .toggleClass('glyphicon-unchecked', !isChecked)
            .toggleClass('glyphicon-check', isChecked);
    };
    Item.prototype.edit = function (name) {
        this.name = name;
        this.$name.html(name);
    };
    Item.prototype.remove = function () {
        this.$root.remove();
    };

    function Form() {
        var self = this;
        this.itemId = null;

        this.$root = $('#form').submit(function (e) {
            self.submit(e);
        });
        this.$nameBox = this.$root.find('input[type="text"]').keydown(function (e) {
            if (e.which == 27) {
                self.reset();
            }
        });
        this.$submitBtn = this.$root.find('button[type="submit"]');
    }

    Form.prototype.edit = function (id) {
        var item = list.get(id);
        if (!item) {
            return;
        }
        this.itemId = id;
        this.$nameBox.val(item.name).focus();
        this.$submitBtn.html('Редагувати');
    };
    Form.prototype.submit = function (e) {
        e.preventDefault();
        var name = this.$nameBox.val().trim();
        if (name.length < 1) {
            return;
        }

        var item;
        if (this.itemId && (item = list.get(this.itemId))) {
            item.edit(name);
            this.reset();
            return;
        }

        list.add(name);
        this.reset();
    };
    Form.prototype.reset = function () {
        this.itemId = null;
        this.$submitBtn.html('Додати');
        this.$nameBox.val('');
    };

    function List() {
        var self = this;
        this.items = {};
        this.checkedCount = 0;
        this.itemsCount = 0;

        this.$root = $('#list');
        this.$checkAll = $('#check-all').click(function () {
            self.toggleCheckAll();
        });
        this.$removeAllChecked = $('#remove-all-checked').click(function () {
            self.removeAllChecked();
        });
    }

    List.prototype.add = function (name) {
        var item = new Item(name);
        this.items[item.id] = item;
        this.itemsCount++;
        this.$root.append(item.$root);
        this.updateCheckAllStatus();
    };
    List.prototype.get = function (id) {
        return this.items[id];
    };
    List.prototype.remove = function (id, onlyIfChecked) {
        var item = this.get(id);
        if (item && (!onlyIfChecked || (onlyIfChecked && item.isChecked))) {
            if (form.itemId == item.id) {
                form.reset();
            }
            if (item.isChecked) {
                this.checkedCount--;
            }
            this.itemsCount--;

            delete this.items[id];
            item.remove();

            this.updateCheckAllStatus();
        }
    };
    List.prototype.toggleCheck = function (id, checked) {
        var item = this.get(id);
        if (item) {
            checked = checked != null ? checked : !item.isChecked;
            if (checked != item.isChecked) {
                item.setChecked(checked);
                this.checkedCount += checked ? 1 : -1;
                this.updateCheckAllStatus();
            }
        }
    };
    List.prototype.allChecked = function () {
        return this.itemsCount > 0 && (this.itemsCount == this.checkedCount);
    };
    List.prototype.toggleCheckAll = function () {
        var check = !this.allChecked();
        for (var id in this.items) {
            this.toggleCheck(id, check);
        }
    };
    List.prototype.removeAllChecked = function () {
        for (var id in this.items) {
            this.remove(id, true);
        }
    };
    List.prototype.updateCheckAllStatus = function () {
        this.$checkAll
            .toggleClass('glyphicon-unchecked', !this.allChecked())
            .toggleClass('glyphicon-check', this.allChecked());
    }
});
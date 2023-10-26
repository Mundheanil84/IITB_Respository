var Chemistry;
(function (Chemistry) {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    Chemistry.Point = Point;
    class Geometry {
        constructor() {
            this._dragable = true;
            this.move_x = false;
            this.revolve = false;
        }
        set stpt(pt) {
            if (this._dragable) {
                this._stpt = pt;
            }
        }
        get stpt() {
            return (this._stpt);
        }
        get draggable() {
            return (this._dragable);
        }
        draw() { }
        calculate() { }
        get area() {
            return (0);
        }
        isinside(Point) {
            let dx = (this._stpt.x - Point.x) * lscale;
            let dy = (this._stpt.y - Point.y) * lscale;
            let r = Math.pow(dx * dx + dy * dy, 0.5);
            if (r < 50) {
                return (true);
            }
            else {
                return (false);
            }
        }
        lock() {
            this._dragable = false;
        }
        triangle_area(pt1, pt2, pt3) {
            return (0);
        }
        change_value() { }
        set_connection(geo) { }
        random(max, min) {
            return (Math.random() * (max - min) + min);
        }
    }
    Chemistry.Geometry = Geometry;
    class Circle extends Geometry {
        constructor(stpt, radius, canvas) {
            super();
            this.Points = [];
            this.value = 0;
            this.color = "red";
            this.connected = false;
            this.stpt = stpt;
            this.radius = radius;
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");
            this.vx = this.random(5, 1);
        }
        draw() {
            if (this.move_x) {
                this.motion_x();
            }
            this.context.beginPath();
            this.context.arc(this.stpt.x * lscale, this.stpt.y * lscale, this.radius * lscale, 0, 2 * Math.PI, false);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.lineWidth = 1;
            this.context.stroke();
            let text = new Text(this.value.toString(), this.stpt, this.canvas);
            text.textalignment = "center";
            text.draw();
            if (this.connected) {
                this.draw_connection();
            }
        }
        change_value() {
            if (this.value == 0) {
                this.value = 1;
                this.color = "green";
            }
            else if (this.value == 1) {
                this.value = 0;
                this.color = "red";
            }
        }
        set_connection(geo) {
            this.objconnected = geo;
            this.connected = true;
        }
        draw_connection() {
            this.context.beginPath();
            this.context.moveTo(this.stpt.x * lscale, this.stpt.y * lscale);
            this.context.lineTo(this.objconnected.stpt.x * lscale, this.objconnected.stpt.y * lscale);
            this.context.stroke();
            this.objconnected.color = this.color;
            this.objconnected.value = this.value;
        }
        motion_x() {
            this.stpt.x += this.vx;
            this.motion_x_check();
        }
        motion_x_check() {
            if (this.stpt.x > 1800) {
                this.stpt.x = 50;
            }
        }
    }
    Chemistry.Circle = Circle;
    class Square extends Geometry {
        constructor(stpt, length, canvas) {
            super();
            this.stpt = stpt;
            this.length = length;
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");
            this.vx = this.random(5, 1);
        }
        calculate() {
            this.p1 = new Point(this.stpt.x * lscale - this.length / 2 * lscale, this.stpt.y * lscale - this.length / 2 * lscale);
            this.p2 = new Point(this.stpt.x * lscale + this.length / 2 * lscale, this.stpt.y * lscale - this.length / 2 * lscale);
            this.p3 = new Point(this.stpt.x * lscale + this.length / 2 * lscale, this.stpt.y * lscale + this.length / 2 * lscale);
            this.p4 = new Point(this.stpt.x * lscale - this.length / 2 * lscale, this.stpt.y * lscale + this.length / 2 * lscale);
        }
        draw() {
            if (this.move_x) {
                this.motion_x();
            }
            this.calculate();
            this.context.beginPath();
            this.context.moveTo(this.p1.x, this.p1.y);
            this.context.lineTo(this.p2.x, this.p2.y);
            this.context.lineTo(this.p3.x, this.p3.y);
            this.context.lineTo(this.p4.x, this.p4.y);
            this.context.closePath();
            this.context.lineWidth = 1;
            this.context.stroke();
        }
        motion_x() {
            this.stpt.x += this.vx;
            this.motion_x_check();
        }
        motion_x_check() {
            if (this.stpt.x > 1800) {
                this.stpt.x = 50;
            }
        }
    }
    Chemistry.Square = Square;
    class Ellipse extends Geometry {
        constructor(stpt, major_length, minor_length, canvas) {
            super();
            this.Points = [];
            this.stpt = stpt;
            this.a = major_length / 2;
            this.b = minor_length / 2;
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");
            this.Points = [];
            this.vx = this.random(5, 1);
        }
        calculate() {
            this.Points = [];
            for (let ang = 0; ang < 360; ang++) {
                let ang1 = ang * Math.PI / 180;
                let x = this.stpt.x * lscale + this.a * lscale * Math.cos(ang1);
                let y = this.stpt.y * lscale + this.b * lscale * Math.sin(ang1);
                this.Points.push(new Point(x, y));
            }
        }
        draw() {
            if (this.move_x) {
                this.motion_x();
            }
            this.calculate();
            this.context.beginPath();
            this.context.moveTo(this.Points[0].x, this.Points[0].y);
            for (let i = 1; i < this.Points.length; i++) {
                this.context.lineTo(this.Points[i].x, this.Points[i].y);
            }
            this.context.lineWidth = 1;
            this.context.fillStyle = "red";
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
        }
        get area() {
            let a = 0;
            for (let i = 0; i < this.Points.length - 1; i++) {
                a += this.Points[i].x * this.Points[i + 1].y - this.Points[i + 1].x * this.Points[i].y;
            }
            a += this.Points[this.Points.length - 1].x * this.Points[0].y - this.Points[0].x * this.Points[this.Points.length - 1].y;
            a = a / 2;
            return (Math.abs(a));
        }
        motion_x() {
            this.stpt.x += this.vx;
            this.motion_x_check();
        }
        motion_x_check() {
            if (this.stpt.x > 1800) {
                this.stpt.x = 50;
            }
        }
    }
    Chemistry.Ellipse = Ellipse;
    class Polygon extends Geometry {
        constructor(stpt, l, n, canvas) {
            super();
            this.Points = [];
            this.stang = 0;
            this.color = "red";
            this.stpt = stpt;
            this.l = l;
            this.n = n;
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");
            this.Points = [];
            this.vx = this.random(5, 1);
        }
        calculate() {
            this.Points = [];
            let angbet = 360.0 / this.n;
            let ang = this.stang;
            for (let i = 0; i < this.n; i++) {
                let ang1 = ang * Math.PI / 180;
                let x = this.stpt.x * lscale + this.l * lscale * Math.cos(ang1);
                let y = this.stpt.y * lscale + this.l * lscale * Math.sin(ang1);
                this.Points.push(new Point(x, y));
                ang += angbet;
            }
        }
        rotate() {
            this.stang++;
            this.rotate_check();
        }
        rotate_check() {
            if (this.stang >= 360) {
                this.stang = 0;
            }
        }
        draw() {
            if (this.move_x) {
                this.motion_x();
            }
            if (this.revolve) {
                this.rotate();
            }
            this.calculate();
            this.context.beginPath();
            this.context.moveTo(this.Points[0].x, this.Points[0].y);
            for (let i = 1; i < this.Points.length; i++) {
                this.context.lineTo(this.Points[i].x, this.Points[i].y);
            }
            this.context.lineWidth = 1;
            this.context.fillStyle = this.color;
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
        }
        get area() {
            let a = 0;
            for (let i = 0; i < this.Points.length - 1; i++) {
                a += this.Points[i].x * this.Points[i + 1].y - this.Points[i + 1].x * this.Points[i].y;
            }
            a += this.Points[this.Points.length - 1].x * this.Points[0].y - this.Points[0].x * this.Points[this.Points.length - 1].y;
            a = a / 2;
            return (a);
        }
        isinside(Point) {
            Point.x = Point.x * lscale;
            Point.y = Point.y * lscale;
            let a = 0;
            for (let i = 0; i < this.Points.length - 1; i++) {
                a += this.triangle_area(Point, this.Points[i], this.Points[i + 1]);
            }
            a += this.triangle_area(Point, this.Points[this.Points.length - 1], this.Points[0]);
            if (Math.abs(this.area - a) < 0.000001) {
                return (true);
            }
            else {
                return (false);
            }
        }
        motion_x() {
            this.stpt.x += this.vx;
            this.motion_x_check();
        }
        motion_x_check() {
            if (this.stpt.x > 1800) {
                this.stpt.x = 50;
            }
        }
        triangle_area(pt1, pt2, pt3) {
            let a = 0;
            a += pt1.x * pt2.y - pt2.x * pt1.y;
            a += pt2.x * pt3.y - pt3.x * pt2.y;
            a += pt3.x * pt1.y - pt1.x * pt3.y;
            return (Math.abs(a / 2));
        }
    }
    Chemistry.Polygon = Polygon;
    class L_bracket extends Geometry {
        constructor(stpt, canvas) {
            super();
            this.Points = [];
            this.stang = 0;
            this.stpt = stpt;
            this.canvas = canvas;
            this.context = this.canvas.getContext('2d');
            this.vx = this.random(5, 1);
        }
        calculate() {
            this.Points = [];
            this.Points.push(new Point((this.stpt.x - 20) * lscale, (this.stpt.y - 20) * lscale));
            this.Points.push(new Point((this.stpt.x - 20) * lscale, (this.stpt.y - 20 + 100) * lscale));
            this.Points.push(new Point((this.stpt.x - 20 + 40) * lscale, (this.stpt.y - 20 + 100) * lscale));
            this.Points.push(new Point((this.stpt.x - 20 + 40) * lscale, (this.stpt.y - 20 + 40) * lscale));
            this.Points.push(new Point((this.stpt.x - 20 + 100) * lscale, (this.stpt.y - 20 + 40) * lscale));
            this.Points.push(new Point((this.stpt.x - 20 + 100) * lscale, (this.stpt.y - 20) * lscale));
            this.Points.push(new Point((this.stpt.x - 20) * lscale, (this.stpt.y - 20) * lscale));
        }
        rotate() {
            this.stang++;
            this.context.rotate(this.stang * Math.PI / 180);
        }
        rotate_check() {
            if (this.stang >= 360) {
                this.stang = 0;
            }
        }
        draw() {
            if (this.move_x) {
                this.motion_x();
            }
            if (this.revolve) {
                this.rotate();
            }
            this.calculate();
            this.path = new Path2D();
            this.path.moveTo(this.Points[0].x, this.Points[0].y);
            for (let i = 1; i < this.Points.length; i++) {
                this.path.lineTo(this.Points[i].x, this.Points[i].y);
            }
            this.context.beginPath();
            this.context.strokeStyle = "black";
            this.context.fillStyle = "red";
            this.context.fill(this.path);
            this.context.stroke(this.path);
        }
        isinside(Point) {
            Point.x = Point.x * lscale;
            Point.y = Point.y * lscale;
            this.context.save();
            this.context.translate(0, this.canvas.height);
            this.context.scale(1, -1);
            if (this.context.isPointInPath(this.path, Point.x, Point.y)) {
                this.context.restore();
                return (true);
            }
            else {
                this.context.restore();
                return (false);
            }
        }
        motion_x() {
            this.stpt.x += this.vx;
            this.motion_x_check();
        }
        motion_x_check() {
            if (this.stpt.x > 1800) {
                this.stpt.x = 50;
            }
        }
    }
    Chemistry.L_bracket = L_bracket;
    class Flask extends Geometry {
        constructor(image, stpt, canvas) {
            super();
            this.dx = 225;
            this.dy = 190;
            this.stang = 0;
            this.img = image;
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");
            this.stpt = stpt;
            this.vx = this.random(5, 1);
        }
        draw() {
            if (this.move_x) {
                this.motion_x();
            }
            this.context.save();
            this.context.translate(this.stpt.x * lscale, this.stpt.y * lscale);
            this.context.scale(1, -1);
            if (this.revolve) {
                this.rotate();
            }
            this.context.drawImage(this.img, -this.dx / 2 * lscale, -this.dy / 2 * lscale, this.dx * lscale, this.dy * lscale);
            this.context.restore();
        }
        rotate() {
            this.stang--;
            this.context.rotate(this.stang * Math.PI / 180);
        }
        rotate_check() {
            if (this.stang <= -360) {
                this.stang = 0;
            }
        }
        isinside(Point) {
            Point.x = Point.x * lscale;
            Point.y = Point.y * lscale;
            if (Point.x > this.stpt.x * lscale - this.dx / 2 * lscale && Point.x < this.stpt.x * lscale + this.dx / 2 * lscale) {
                if (Point.y > this.stpt.y * lscale - this.dy / 2 * lscale && Point.y < this.stpt.y * lscale + this.dy / 2 * lscale) {
                    return (true);
                }
            }
            return (false);
        }
        motion_x() {
            this.stpt.x += this.vx;
            this.motion_x_check();
        }
        motion_x_check() {
            if (this.stpt.x > 1800) {
                this.stpt.x = 50;
            }
        }
    }
    Chemistry.Flask = Flask;
    class Text {
        constructor(text, stpt, canvas) {
            this.font = "20px Arial";
            this.color = "black";
            this.angle = 0;
            this.textalignment = "left";
            this.stpt = stpt;
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");
            this.text = text;
        }
        draw() {
            this.context.font = this.font;
            this.context.fillStyle = this.color;
            this.context.textAlign = this.textalignment;
            this.context.save();
            this.context.translate(this.stpt.x * lscale, this.stpt.y * lscale);
            this.context.rotate(this.angle * Math.PI / 180);
            this.context.scale(1, -1);
            this.context.fillText(this.text, 0, 0);
            this.context.restore();
        }
    }
    Chemistry.Text = Text;
    class Tank extends Geometry {
        constructor(stpt, height, width, canvas) {
            super();
            this.fill_anim = false;
            this.fill_height = 0;
            this.canvas = canvas;
            this.height = height;
            this.width = width;
            this.stpt = stpt;
        }
        fill() {
            this.fill_height++;
            this.fill_check();
        }
        fill_check() {
            if (this.fill_height >= this.height) {
                this.fill_height = 0;
            }
        }
        draw() {
            if (this.fill_anim) {
                this.fill();
            }
            context.beginPath();
            context.rect((this.stpt.x - this.width / 2) * lscale, (this.stpt.y - this.height / 2) * lscale, this.width * lscale, this.fill_height * lscale);
            context.fillStyle = "blue";
            context.strokeStyle = "blue";
            context.lineWidth = 1;
            context.fill();
            context.stroke();
            context.beginPath();
            context.rect((this.stpt.x - this.width / 2) * lscale, (this.stpt.y - this.height / 2) * lscale, this.width * lscale, this.height * lscale);
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.stroke();
        }
    }
    Chemistry.Tank = Tank;
    class Sine extends Geometry {
        constructor(stpt, geo, canvas) {
            super();
            this.magnitude = 100;
            this.k = 0;
            this.stpt = stpt;
            this.geo = geo;
            this.canvas = canvas;
            this.context = this.canvas.getContext("2d");
        }
        calculate() {
            this.Points = [];
            for (let i = 0; i <= 360; i++) {
                let x = this.stpt.x + i;
                let y = this.stpt.y + this.magnitude * Math.sin(i * Math.PI / 180);
                this.Points.push(new Point(x, y));
            }
        }
        draw() {
            this.calculate();
            this.context.beginPath();
            this.context.moveTo(this.Points[0].x * lscale, this.Points[0].y * lscale);
            for (let i = 1; i <= 360; i++) {
                this.context.lineTo(this.Points[i].x * lscale, this.Points[i].y * lscale);
            }
            this.context.strokeStyle = "red";
            this.context.stroke();
            this.context.strokeStyle = "black";
            this.geo.stpt = new Point(this.Points[this.k].x, this.Points[this.k].y);
            this.geo.draw();
            this.update();
        }
        update() {
            this.k++;
            if (this.k > 360) {
                this.k = 0;
            }
        }
    }
    Chemistry.Sine = Sine;
})(Chemistry || (Chemistry = {}));
//# sourceMappingURL=geometry.js.map
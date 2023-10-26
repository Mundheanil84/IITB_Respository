const div_dashboard: HTMLDivElement = <HTMLDivElement>document.getElementById("dashboard");
const div_panel: HTMLDivElement = <HTMLDivElement>document.getElementById("panel");
function activity1() {
    var stpt = new Chemistry.Point(400, 400);
    var mycircle = new Chemistry.Circle(stpt, 50, canvas);
    scene.add(mycircle);
    var stpt = new Chemistry.Point(600, 200);
    var ellispe = new Chemistry.Ellipse(stpt, 150, 90, canvas);
    scene.add(ellispe);
    var stpt = new Chemistry.Point(700, 400);
    var sqr = new Chemistry.Polygon(stpt, 75, 4, canvas);
    sqr.stang = 45;
    scene.add(sqr);
}

function dashboard() {
    div_dashboard.style.left = `${canvas.width - 185}px`
    div_dashboard.style.top = `${rect.y + 10}px`
    // div_panel.style.left=`${canvas.width-185}px` 
    // div_panel.style.top=`${rect.y+35}px`
    // div_panel.style.width="180px";
}

function dashboard_button() {
    div_dashboard.innerHTML = `<input type"button" value="sqaure" onclick="square_click();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value="flask" onclick="flask_click();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value="Pentagon" onclick="pentagon_click();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value="Change color" onclick="change_color_click();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value="Drag" onclick="drag_click();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value="L-Bracket" onclick="bracket_click();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value="Circle" onclick="circle_click();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value="Set value" onclick="change_value_click();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value="Set connection" onclick="connect_click();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value=" Move flask" onclick="move_flask_x();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value=" Move L_bracket" onclick="move_l_bracket_x();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value=" Move Circle" onclick="move_circle_x();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value=" Move Square" onclick="move_square_x();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value=" Move Pentagon" onclick="move_pentagon_x();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value=" Rotate polygon" onclick="rotate_polygon();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value=" Rotate " onclick="rotate();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value="Move " onclick="move_click();" style="width:60px">`;
    div_dashboard.innerHTML += `<input type"button" value="Tank" onclick="tank_click();" style="width:60px">`;
    // div_dashboard.innerHTML += `<input type"button" value="Tank fill" onclick="tank_fill();" style="width:60px">`;






}


function show_polygon_panel() {
    div_panel.innerHTML = `<p style="width:60px;display: inline-block">Start pt</p>
                        <input type="text" id="stptx" style="width:45px">
                        <input type="text" id="stpty" style="width:45px">
                        <p style="width:100px;display: inline-block">No of Side:</p>
                        <input type="text" id="n" style="width:50px">
                        <p style="width:100px;display: inline-block">length: </p>
                        <input type="text" id="l" style="width:50px">
                        <p style="width:100px;display: inline-block">Name:</p>
                        <input type="text" id="name" style="width:50px">
                        <p style="width: 100px;display: inline-block">Start angle:</p>
                        <input type="text" id="stang" style="width:50px">
                        <input type="button" value="Draw" onclick="draw_polygon();" style="width:60px">
                        <input type="button" value="Area" onclick="area_geometry();" style="width:60px">
                        <br><p style="width:45px;display: inline-block">Area</p>
                        <input type="text" id="area" style="width: 100px">`;
}

function draw_polygon() {
    var stptx = <HTMLInputElement>document.getElementById("stptx");
    var stpty = <HTMLInputElement>document.getElementById("stpty");
    var l = <HTMLInputElement>document.getElementById("l");
    var n = <HTMLInputElement>document.getElementById("n");
    var name = <HTMLInputElement>document.getElementById("name");
    var stang = <HTMLInputElement>document.getElementById("stang");
    var stpt = new Chemistry.Point(parseInt(stptx.value), parseInt(stpty.value));
    var sqr = new Chemistry.Polygon(stpt, parseInt(l.value), parseInt(n.value), canvas);
    sqr.name = name.value;
    sqr.stang = parseInt(stang.value);
    scene.add(sqr);
}

function area_geometry() {
    var name = <HTMLInputElement>document.getElementById("name");
    var area = <HTMLInputElement>document.getElementById("area");
    area.value = `${scene.area(name.value)}`;

}
var img = new Image();
img.src = "./images/flask.png";

function test_mapping() {
    context.fillStyle = "green";
    context.fillRect(50, 50, 100, 50);
    context.save();
    context.translate(200, 200);
    context.rotate(45 * Math.PI / 180);
    context.fillRect(50, 50, 100, 50);
    context.restore();

}

function test_transformation() {
    context.fillStyle = "green";
    context.fillRect(200, 200, 100, 50);
    context.save();
    context.translate(200, 200);
    context.rotate(45 * Math.PI / 180);
    context.translate(-200, -200);
    context.fillRect(200, 200, 100, 50);
    context.restore();

}

function draw_square(x: number, y: number) {
    let sq = new Chemistry.Polygon(new Chemistry.Point(x, y), 100, 4, canvas);
    sq.name = "square";
    scene.add(sq);
}
function draw_tank(x: number, y: number) {
    let tank = new Chemistry.Tank(new Chemistry.Point(x, y), 400, 200, canvas);
    tank.name = "Tank";
    scene.add(tank);
    tank.fill_anim = true;
    redraw_scene();
}
// function fill_tank() {
//     function draw_tank();
//     tank.fill_anim = true;
//     redraw_scene();
// }

function draw_flask(x: number, y: number) {
    let flask = new Chemistry.Flask(img, new Chemistry.Point(x, y), canvas);
    flask.name = "flask";
    scene.add(flask);
}

function draw_pentagon(x: number, y: number) {
    let sq = new Chemistry.Polygon(new Chemistry.Point(x, y), 100, 5, canvas);
    sq.name = "pentagon";
    scene.add(sq);
}

function draw_bracket(x: number, y: number) {
    let sq = new Chemistry.L_bracket(new Chemistry.Point(x, y), canvas);
    sq.name = "bracket";
    scene.add(sq);
}

function draw_circle(x: number, y: number) {
    let sq = new Chemistry.Circle(new Chemistry.Point(x, y), 50, canvas);
    sq.name = "circle";
    scene.add(sq);
}

function change_color(x: number, y: number) {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.isinside(new Chemistry.Point(x, y))) {
            scene.container[i].geo.color = "blue";
            scene.draw();
            break;
        }
    }
}
var anim: boolean = false;
var timer1;
function move_flask_x() {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.name == 'flask') {
            scene.container[i].geo.move_x = true;
        }
    }
    anim = false;
    timer1 = setInterval(deffered_frame, 100);
}
function deffered_frame() {
    anim = true;
    redraw_scene();
    clearInterval(timer1);
}

function rotate_polygon() {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.name == 'square' || scene.container[i].geo.name == 'pentagon') {
            scene.container[i].geo.revolve = true;
        }
    }
    anim = false;
    timer1 = setInterval(deffered_frame, 100);
}

function rotate() {
    for (let i = 0; i < scene.container.length; i++) {

        scene.container[i].geo.revolve = true;

    }
    anim = false;
    timer1 = setInterval(deffered_frame, 100);
}
function move_circle_x() {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.name == 'circle') {
            scene.container[i].geo.move_x = true;
        }
    }
    motion_l_bracket_x();
}
function move_square_x() {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.name == 'square') {
            scene.container[i].geo.move_x = true;
        }
    }
    motion_l_bracket_x();
}
function move_pentagon_x() {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.name == 'pentagon') {
            scene.container[i].geo.move_x = true;
        }
    }
    motion_l_bracket_x();
}
function move_l_bracket_x() {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.name == 'bracket') {
            scene.container[i].geo.move_x = true;
        }
    }
    motion_l_bracket_x();
}

function drag_geo(x: number, y: number) {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.isinside(new Chemistry.Point(x, y)) && scene.container[i].geo.draggable) {
            scene.container[i].geo.stpt = new Chemistry.Point(x, y);
            scene.draw();
            //  assemble(scene.container[i].geo);
            scene.draw();
            break;
        }
    }
}
function change_value(x: number, y: number) {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.isinside(new Chemistry.Point(x, y))) {
            scene.container[i].geo.change_value();
            scene.draw();
            break;
        }
    }
}

function move_geo(x: number, y: number) {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.isinside(new Chemistry.Point(x, y))) {
            scene.container[i].geo.move_x = true;
            break;
        }
    }
    redraw_scene();
}
let storei = -1;
let start1 = 0;
function set_connection(x: number, y: number) {
    for (let i = 0; i < scene.container.length; i++) {
        if (scene.container[i].geo.isinside(new Chemistry.Point(x, y))) {
            if (start1 == 0) {
                storei = i;
                start1 = 1;
                console.log(i);
            }
            else if (start1 == 1) {
                scene.container[storei].geo.set_connection(scene.container[i].geo);
                start1 = 0;
                storei = -1;
                console.log(i);

            }
            scene.draw();
            break;
        }
    }
}
function assemble(obj: Chemistry.Geometry) {
    for (let i = 0; i < scene1.container.length; i++) {
        if (scene1.container[i].geo.isinside(new Chemistry.Point(obj.stpt.x, obj.stpt.y)) && scene1.container[i].geo.name == obj.name) {
            obj.stpt = scene1.container[i].geo.stpt;
            obj.lock();
            break;
        }
    }
}
var geo: string;
function square_click() {
    geo = "square";
}
function flask_click() {
    geo = "Flask";
}

function pentagon_click() {
    geo = "Pentagon";

}
function change_color_click() {
    geo = "Color";
}

function drag_click() {
    geo = "Drag";
}
function bracket_click() {
    geo = "Bracket";
}

function change_value_click() {
    geo = "Change_value";
}

function circle_click() {
    geo = "Circle";
}

function connect_click() {
    geo = "Connect";
}
function move_click() {
    geo = "Move";
}
function tank_click() {
    geo = "Tank";
}
function redraw_scene() {
    scene.draw();
    window.requestAnimationFrame(redraw_scene);
}
function motion_l_bracket_x() {
    scene.draw();
    window.requestAnimationFrame(motion_l_bracket_x);
}


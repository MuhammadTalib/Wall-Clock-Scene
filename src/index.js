import * as THREE from "three"
import {matrix,multiply} from "mathjs"

var clockRadius=40

var today = new Date();
var seconds = today.getSeconds();
var minutes=today.getMinutes();
var hours=today.getHours()

var t=(((2*Math.PI*clockRadius)/3600)/clockRadius)
var C=2*Math.PI*clockRadius
var unitS=C/360
var rad=(unitS*30)/clockRadius

var scene = new THREE.Scene();

var camera =new THREE.OrthographicCamera(-100,100,100,-100,-1000,1000)
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor("#000");
renderer.setSize( 1000,1000 );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.RingGeometry( clockRadius, clockRadius+1.5, 360 );
var material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

var geometry = new THREE.CircleGeometry( clockRadius, 360 );
var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
var circle = new THREE.Mesh( geometry, material );
scene.add( circle );

var geometry = new THREE.CircleGeometry( 0.5, 360 );
var material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
var circle = new THREE.Mesh( geometry, material );
scene.add( circle );


var to = new THREE.Vector3(clockRadius-2 , 0,0);
var from = new THREE.Vector3( 0, 0, 0 );
var direction = to.clone().sub(from);
var length = direction.length();
var secondArrow = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
scene.add( secondArrow );
//secondArrow.rotation.z-=Math.PI/2
secondArrow.rotation.z=((seconds*6)-180)*(Math.PI/180)

var to = new THREE.Vector3(clockRadius-2 , 0,0);
var from = new THREE.Vector3( 0, 0, 0 );
var direction = to.clone().sub(from);
var length = direction.length();
var minuteArrow = new THREE.ArrowHelper(direction.normalize(), from, length, 0x00004d );
scene.add( minuteArrow );
//secondArrow.rotation.z-=Math.PI/2
minuteArrow.rotation.z=((minutes*6)-180)*(Math.PI/180)

var to = new THREE.Vector3(clockRadius-13 , 0,0);
var from = new THREE.Vector3( 0, 0, 0 );
var direction = to.clone().sub(from);
var length = direction.length();
var hourArrow = new THREE.ArrowHelper(direction.normalize(), from, length, 0x009900 );
scene.add( hourArrow );
hourArrow.rotation.z-=((hours*6)+90)*(Math.PI/180)



var render = function () {

    requestAnimationFrame( render );
    secondArrow.rotation.z+=t
    minuteArrow.rotation.z+=t/60
    hourArrow.rotation.z+=t/3600
    
    renderer.render(scene, camera);
};

render();
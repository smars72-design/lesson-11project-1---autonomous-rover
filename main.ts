//  NAT10935006 AT2 - STEMPunks Rover autonomous obstacle avoidance
//  Replace the adapter function contents with the class kit blocks.
let STOP_DISTANCE_CM = 20
let SLOW_DISTANCE_CM = 30
let NORMAL_SPEED = 55
let SLOW_SPEED = 30
let REVERSE_SPEED = 35
let TURN_SPEED = 40
function read_front_distance_cm(): number {
    //  KIT-SPECIFIC: return the front sensor distance in centimetres.
    //  Example: return <STEM Punks distance sensor block>
    return -1
}

function set_left_motor(speed: number) {
    //  KIT-SPECIFIC: set M1. Positive = forward, negative = reverse.
    
}

function set_right_motor(speed: number) {
    //  KIT-SPECIFIC: set M2. Positive = forward, negative = reverse.
    
}

function stop_motors() {
    set_left_motor(0)
    set_right_motor(0)
}

function drive_forward(speed: number) {
    set_left_motor(speed)
    set_right_motor(speed)
}

function reverse(speed: number) {
    set_left_motor(-speed)
    set_right_motor(-speed)
}

function turn_right(speed: number) {
    set_left_motor(speed)
    set_right_motor(-speed)
}

function emergency_stop_active() {
    //  Replace with the emergency-stop input approved for the class Rover.
    return input.buttonIsPressed(Button.A) && input.buttonIsPressed(Button.B)
}

stop_motors()
basic.showIcon(IconNames.Square)
basic.pause(2000)
basic.forever(function autonomous_loop() {
    if (emergency_stop_active()) {
        stop_motors()
        basic.showIcon(IconNames.No)
        basic.pause(100)
        return
    }
    
    let distance_cm = read_front_distance_cm()
    if (distance_cm <= 0) {
        stop_motors()
        basic.showIcon(IconNames.Sad)
    } else if (distance_cm < STOP_DISTANCE_CM) {
        stop_motors()
        basic.showIcon(IconNames.No)
        basic.pause(200)
        reverse(REVERSE_SPEED)
        basic.pause(450)
        turn_right(TURN_SPEED)
        basic.pause(550)
        stop_motors()
    } else if (distance_cm <= SLOW_DISTANCE_CM) {
        drive_forward(SLOW_SPEED)
        basic.showIcon(IconNames.SmallDiamond)
    } else {
        drive_forward(NORMAL_SPEED)
        basic.showIcon(IconNames.Happy)
    }
    
    basic.pause(100)
})

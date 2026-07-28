# NAT10935006 AT2 - autonomous obstacle avoidance
# Replace the adapter function contents with the class kit blocks.

STOP_DISTANCE_CM = 20
SLOW_DISTANCE_CM = 30
NORMAL_SPEED = 55
SLOW_SPEED = 30
REVERSE_SPEED = 35
TURN_SPEED = 40

def read_front_distance_cm():
    # KIT-SPECIFIC: return the front sensor distance in centimetres.
    # Example: return <STEM Punks distance sensor block>
    return -1

def set_left_motor(speed):
    # KIT-SPECIFIC: set M1. Positive = forward, negative = reverse.
    pass

def set_right_motor(speed):
    # KIT-SPECIFIC: set M2. Positive = forward, negative = reverse.
    pass

def stop_motors():
    set_left_motor(0)
    set_right_motor(0)

def drive_forward(speed):
    set_left_motor(speed)
    set_right_motor(speed)

def reverse(speed):
    set_left_motor(-speed)
    set_right_motor(-speed)

def turn_right(speed):
    set_left_motor(speed)
    set_right_motor(-speed)

def emergency_stop_active():
    # Replace with the emergency-stop input approved for the class Rover.
    return input.button_is_pressed(Button.A) and input.button_is_pressed(Button.B)
stop_motors()
basic.show_icon(IconNames.SQUARE)
basic.pause(2000)

def autonomous_loop():
    if emergency_stop_active():
        stop_motors()
        basic.show_icon(IconNames.NO)
        basic.pause(100)
        return

    distance_cm = read_front_distance_cm()

    if distance_cm <= 0:
        stop_motors()
        basic.show_icon(IconNames.SAD)

    elif distance_cm < STOP_DISTANCE_CM:
        stop_motors()
        basic.show_icon(IconNames.NO)
        basic.pause(200)

        reverse(REVERSE_SPEED)
        basic.pause(450)

        turn_right(TURN_SPEED)
        basic.pause(550)
        stop_motors()

    elif distance_cm <= SLOW_DISTANCE_CM:
        drive_forward(SLOW_SPEED)
        basic.show_icon(IconNames.SMALL_DIAMOND)

    else:
        drive_forward(NORMAL_SPEED)
        basic.show_icon(IconNames.HAPPY)

    basic.pause(100)

basic.forever(autonomous_loop)

/**
 * globals
 * @wet: threshold sensor value for wet soil
 * @dry: threshold sensor value for dry soil. future event trigger for watering
 * @sensor_pin: hardware input pin where moisture sensor data is collected
 * @baud_rate: communication rate across USB port
 * @loop_delay: 6 hour reading delay (milliseconds)
 * @prev_reading: allows comparison across readings
 */

int wet = 400;
int dry = 250;
int sensor_pin = A0;
int baud_rate = 9600;
int loop_delay = 21600000;

/**
 * setup - runs on startup
 *
 */

void setup(){
	Serial.begin(baud_rate);
	delay(500);
}

/**
 * loop - collects reading and hopefully runs ad infinitum
 * NOTE: minimize function calls and associated overhead for memory optimization
 */

void loop(){
	int sensor_value;
	int temp_sum = 0, i = 0, accuracy_loop = 10;

	// read 10 times with 5 second delay to average reading
	for (i = 0; i < accuracy_loop; i++)
	{
		temp_sum += analogRead(sensor_pin);
		delay(5000);
	}
	sensor_value = temp_sum / accuracy_loop;

	// actual value being written
	Serial.print(sensor_value);

	// this is our delimiter
	Serial.print("");

	delay(loop_delay);
}

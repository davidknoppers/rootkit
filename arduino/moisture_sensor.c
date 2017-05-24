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
	int i = 0, accuracy_loop = 10;

	// read 10 times with 5 second delay to average reading
	// delimiter "~" for each individual reading
	for (i = 0; i < accuracy_loop; i++)
	{
		Serial.print(analogRead(sensor_pin));
		Serial.print("~");
		delay(5000);
	}

	// delimiter for end of reading series
	Serial.print("\n");

	delay(loop_delay);
}

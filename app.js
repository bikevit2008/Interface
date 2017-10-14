var rpio = require('rpio'); //Подключаем библиотеку RPIO; Use library RPIO
var motorPins = [[35,36], [37,38]]; //Назначаем контакты для моторов [направление, сделать шаг]; Define motor pins [direction, make step]
var laserPin = 40; //Назначаем котакт для лазера; Define pin for laser
var frequencyMotors = 1000; //Частота сигналов на каждый мотор в Герцах; Frequency of the signals for every motor in Herz
var delayMotorsMS = frequencyToHalfPeriod(frequencyMotors);
var delayLaserMks = 100;
var pixels = [[1,1,1], [0,1,0], [1,0,0]];
var sign = 255;


var pixels = [];



var engraveFromIPC = function (pixels){
    engrave(motorPins, laserPin, pixels)
}
module.exports.engraveFromIPC = engraveFromIPC

function testMotor()
{
    var num = 0;
    for(var g = 0; g < 10000; g++)
    {
        if(g < 5000)
        {
            rpio.write(motorPins[num][0], rpio.HIGH); //Устанавливаем направление первого мотора вперед
            makeStep(num, motorPins);
        }
        if(g == 5000)
        {
            rpio.msleep(100);
        }
        if(g >= 5000)
        {
            rpio.write(motorPins[num][0], rpio.LOW); //Устанавливаем направление первого мотора вперед
            makeStep(num, motorPins);
        }
    }
}
function engrave(motorPins, laserPin, pixels)
{
    enablePins(motorPins, laserPin);
    var i = 0; //Текущая строка
    var j = 0; //Текущий столбец
    var countRows = pixels.length; //Количество строк
    var countColumns = pixels[0].length; //Количество столбцов
    rpio.write(motorPins[0][0], rpio.HIGH); //Устанавливаем направление первого мотора вперед

    while(i<countRows - 1) //Цикл шагов по строкам
    {

        j = cycleColumns(i, pixels, countColumns, motorPins);//Проход по всем столбцам в строке, проход всех шагов в строке, получение координаты мотора

        //Переход к следующей строке
        //Один шаг первого двигателя
        makeStep(0, motorPins);

        i++;
    }
    j = cycleColumns(i, pixels, countColumns, motorPins);//Последняя строка, пройти по столбцам и назначить счетчик шагов
    //Сообщить об успехе

    //Возвращаем двигатели в исходные позиции
    backwardMotors(i, j, motorPins);
    disablePins(motorPins, laserPin);
}
function backwardMotors(i, j, motorPins)
{
    rpio.write(motorPins[0][0], rpio.LOW); //Устанавливаем направление первого мотора назад

    while(i > 0)
    {
        //Переход к следующей строке
        //Один шаг первого двигателя
        makeStep(0, motorPins);
        i--;
    }

    rpio.write(motorPins[1][0], rpio.LOW); //Устанваливаем направление второго мотора назад

    while (j > 0) //Проходим все столбцы в строке с конца
    {
        //Переход к следующему столбцу
        //Один шаг второго двигателя
        makeStep(1, motorPins);
        j--;
    }
}
function cycleColumns(i, pixels, countColumns, motorPins)
{
    if(i % 2 == 0) //Если строка четная, то цикл идет с первого[0] столбца
    {
        var j = 0; //Текущий столбец, первый
        rpio.write(motorPins[1][0], rpio.HIGH); //Устанавливем направление второго мотора вперед
        while(j<countColumns - 1) //Цикл шагов двигателя по столбцам
        {
            //Выжигаем точку
            makePixel(pixels, i, j);
            //Переход к следующему столбцу
            //Один шаг второго двигателя
            makeStep(1, motorPins);
            j++;
        }
        makePixel(pixels, i, j);
    }
    if(i % 2 == 1) //Если строка нечетная, то цикл идет с последнего [countColumns - 1] столбца
    {
        var j = countColumns - 1; //Текущий столбец, последний
        rpio.write(motorPins[1][0], rpio.LOW); //Устанваливаем направление второго мотора назад
        while (j > 0) //Цикл шагов двигателя по столбцам с конца
        {
            //Выжигаем точку
            makePixel(pixels, i, j);
            //Переход к следующему столбцу
            //Один шаг второго двигателя
            makeStep(1, motorPins);

            j--;
        }
        makePixel(pixels, i, j);
    }
    return j;
}
function makePixel(pixels, i, j)
{
    var pixel = pixels[i][j]; //Берем значение по координатам
    if(pixel == sign) //Если пиксель имеет значение(черный цвет, то выжечь)
    {
        rpio.write(laserPin, rpio.HIGH); //Включаем лазер
        rpio.usleep(delayLaserMks); //Ждем некоторое время delayLaserMS, в миллисекундах
        rpio.write(laserPin, rpio.LOW); //Выключаем лазер
    }
}
function makeStep(motorIndex, motorPins)
{
    rpio.write(motorPins[motorIndex][1], rpio.HIGH); //Подаем импульс (3,3 Вольта)
    rpio.msleep(delayMotorsMS); //Ожидаем некоторое время delayMotorsMS, в миллисекундах
    rpio.write(motorPins[motorIndex][1], rpio.LOW); //Убираем импульс
    rpio.msleep(delayMotorsMS); //Ожидаем некоторое время delayMotorsMS, в миллисекундах
}
function frequencyToHalfPeriod(frequency)
{
    var period = 1 / frequency; //Получаем период
    var halfPeriod = period / 2; //Получаем полу период для импульсов
    halfPeriod = halfPeriod * 1000; //Приводим к миллисекундам
    return halfPeriod;
}
function enablePins(motorPins, laserPin) //Установка режима работы контактов; Setting up mode of the pins
{
    for(var i = 0; i < 2; i++)
        {
            for(var j = 0; j < 2; j++)
            {
                rpio.open(motorPins[i][j], rpio.OUTPUT, rpio.LOW);
            }
        }
    rpio.open(laserPin, rpio.OUTPUT, rpio.LOW);
}
function disablePins(motorPins, laserPin)
{
        for(var i = 0; i < 2; i++)
        {
            for(var j = 0; j < 2; j++)
            {
                rpio.close(motorPins[i][j], rpio.PIN_RESET);
            }
        }
    rpio.close(laserPin, rpio.PIN_RESET);
}

<?php
class Person {
    private $name;
    private $lastname;
    private $age;
    private $hp;
    private $mother;
    private $father;
    private $grandmother1;
    private $grandfather1;
    private $grandmother2;
    private $grandfather2;

    function __construct($name, $lastname, $age, $mother = null, $father = null, $grandmother1 = null, $grandfather1 = null, $grandmother2 = null, $grandfather2 = null) 
    {
        $this->name = $name;
        $this->lastname = $lastname;
        $this->age = $age;
        $this->mother = $mother;
        $this->father = $father;
        $this->grandmother1 = $grandmother1;
        $this->grandfather1 = $grandfather1;
        $this->grandmother2 = $grandmother2;
        $this->grandfather2 = $grandfather2;
        $this->hp = 100;
    }

    function sayHi($name) {
        return "Hi, $name, I'm " . $this->name;
    }
    
    function setHp($hp) {
        if ($this->hp + $hp >= 100)
            $this->hp = 100;
        else
            $this->hp = $this->hp + $hp;
    }
    
    function getHp() {
        return $this->hp;
    }

    function getName() {
        return $this->name;
    }

    function getLastname() {
        return $this->lastname;
    }

    function getMother() {
        return $this->mother;
    }

    function getFather() {
        return $this->father;
    }

    function getGrandMotherMother() {
        return $this->grandmother1;
    }

    function getGrandFatherMother() {
        return $this->grandfather1;
    }
    
    function getGrandMotherFather() {
        return $this->grandmother2;
    }

    function getGrandFatherFather() {
        return $this->grandfather2;
    }

    function getInfo() {
        return "<h3>Несколько слов о моих родственниках:</h3><br>" . 
        "Моё имя: " . $this->getName() . 
        "<br>Моя фамилия: " . $this->getLastname() . 
        "<br>Моего папу зовут: " . $this->getFather()->getName() . " " . $this->getFather()->getLastname() . 
        "<br>Мою маму зовут: " . $this->getMother()->getName() . " " . $this->getMother()->getLastname() . 
        "<br>Моих бабушек зовут: " . $this->getGrandMotherMother()->getName() . " и " . $this->getGrandMotherFather()->getName() .
        "<br>Моих дедушек зовут: " . $this->getGrandFatherMother()->getName() . " и " . $this->getGrandFatherFather()->getName();
    }
}


// Бабушка и дедушка по маме
$elena = new Person("Elena", "Maltseva", 69);
$evgeniy = new Person("Evgeniy", "Efimov", 70);

// Бабушка и дедушка по папе
$sergey = new Person("Sergey", "Fitilkov", 63);
$olga = new Person("Olga", "Fitilkova", 65);

$pavel = new Person("Pavel", "Fitilkov", 41, $olga, $sergey);
$elena_mama = new Person("Elena", "Efimova", 43, null, $elena, $evgeniy);
$alexandra = new Person("Alexandra", "Fitilkova", 14, $elena_mama, $pavel, $elena, $evgeniy, $olga, $sergey);

echo $alexandra->getInfo();


// Здоровье человека не может быть более 100 ед

// $medKit = 50;

// echo $alex->sayHi($igor->name) . "<br>";
// echo $igor->sayHi($alex->name);

// $alex->setHp(-30); //Упал
// echo $alex->getHp() . "<br>";
// $alex->setHp($medKit); //Нашёл аптечку
// echo $alex->getHp() . "<br>";
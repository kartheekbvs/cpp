import { Topic } from './curriculum';

export const phase7Content: Record<string, Topic> = {
  "7.1": {
    id: "7.1", title: "Classes & Objects", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Class declaration", "Objects as instances", "Member variables", "Member functions"],
    story: `Think of a **class** as a **blueprint** for a house. The blueprint describes the layout — rooms, doors, windows — but it's not a house itself. An **object** is the ACTUAL house built from that blueprint. You can build many houses (objects) from the same blueprint (class), each with its own furniture (data) but the same structure.\n\nA class bundles **data** (member variables) and **behavior** (member functions) into one unit. This is the foundation of OOP — instead of scattered variables and functions, everything related to a concept lives together in a class.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│         CLASS vs OBJECT — BLUEPRINT vs HOUSE              │
│                                                          │
│  class Student {          ← Blueprint                    │
│      string name;         ← Data member                  │
│      int age;                                            │\n│      void study() { }    ← Member function              │\n│  };                                                      │\n│                                                          │\n│  Student s1;  ← Object 1 (actual house)                 │\n│  ┌──────────────┐                                       │\n│  │ name: "Ali"  │                                       │\n│  │ age: 20      │                                       │\n│  └──────────────┘                                       │\n│                                                          │\n│  Student s2;  ← Object 2 (another house)                │\n│  ┌──────────────┐                                       │\n│  │ name: "Sara" │                                       │\n│  │ age: 22      │                                       │\n│  └──────────────┘                                       │\n│  Same structure, DIFFERENT data!                         │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "class Student {", explanation: "Declare a class (blueprint)", memoryChange: "No memory yet — just a type definition", output: "None" },
      { line: "public: string name; int age;", explanation: "Member variables (data each object will hold)", memoryChange: "No memory yet", output: "None" },
      { line: "void introduce() { cout << name << age; }", explanation: "Member function (behavior each object can do)", memoryChange: "No memory yet", output: "None" },
      { line: "Student s1; s1.name=\"Ali\"; s1.age=20;", explanation: "Create object and set data", memoryChange: "Object s1 allocated on stack with its own data", output: "None" },
      { line: "s1.introduce();", explanation: "Call member function on object", memoryChange: "No change", output: "Ali 20" },
    ],
    code: `#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int age;
    double gpa;
    
    void introduce() {
        cout << "Hi, I'm " << name << ", age " << age << ", GPA: " << gpa << endl;
    }
    
    bool isHonors() {
        return gpa >= 3.5;
    }
};

int main() {
    Student s1;
    s1.name = "Ali";
    s1.age = 20;
    s1.gpa = 3.8;
    s1.introduce();
    cout << "Honors: " << s1.isHonors() << endl;
    
    Student s2;
    s2.name = "Sara";
    s2.age = 22;
    s2.gpa = 3.2;
    s2.introduce();
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Classes & Objects", content: `class ClassName {\npublic:      // access specifier\n    type var;     // member variable\n    void func();  // member function\n};  // DON'T FORGET THE SEMICOLON!\n\n// Create object:\nClassName obj;\nobj.var = value;\nobj.func();\n\n// Pointer to object:\nClassName* ptr = &obj;\nptr->var = value;  // arrow operator\nptr->func();` },
    mistakes: [
      { wrong: "class Dog { }  // missing semicolon", correct: "class Dog { };  // semicolon after closing brace!", explanation: "A very common beginner mistake — the class definition MUST end with a semicolon after the closing brace. Without it, the compiler thinks the next statement is part of the class." },
      { wrong: "Dog.name = \"Rex\";  // using class name", correct: "Dog myDog; myDog.name = \"Rex\";  // use object", explanation: "A class is a type, not an object. You must create an instance (object) before accessing members." },
    ],
    leetcode: { problem: "OOP Concept: Design a Student Management System", approach: "Create a Student class with name, age, gpa, and methods for display and honors check.", dryRun: "Create student Ali (GPA 3.8) → isHonors() = true", code: "// See code example above — complete Student class", complexity: "Time: O(1) per operation, Space: O(n) for n students" },
    checkpoint: { question: "What is the difference between a class and an object?", options: ["They are the same thing", "Class is a blueprint, object is an instance", "Object is a blueprint, class is an instance", "Classes don't exist in C++"], answer: 1 }
  },

  "7.2": {
    id: "7.2", title: "Constructors & Destructors", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Default constructor", "Parameterized constructor", "Copy constructor", "Destructor"],
    story: `A **constructor** is like a **move-in checklist** — when you build a house (create an object), the constructor runs automatically to set everything up. Default constructor has no parameters. Parameterized constructor takes values to customize the object.\n\nA **destructor** is the **move-out checklist** — when the house is demolished (object goes out of scope), the destructor runs to clean up: release memory, close files, etc. If your class allocates dynamic memory, you MUST write a destructor to free it, or you get memory leaks!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│   CONSTRUCTORS & DESTRUCTORS — LIFECYCLE                 │
│                                                          │\n│  Student s("Ali", 20);  ← Constructor called            │\n│  ┌──────────────┐                                       │\n│  │ name: "Ali"  │  ← Object alive                       │\n│  │ age: 20      │                                       │\n│  └──────────────┘                                       │\n│  s.~Student();  ← Destructor called (automatic at })    │\n│  ┌──────────────┐                                       │\n│  │ FREED        │  ← Memory released                    │\n│  └──────────────┘                                       │\n│                                                          │\n│  RULE OF THREE: If you define any of these, define all: │\n│  1. Destructor                                           │\n│  2. Copy constructor                                     │\n│  3. Copy assignment operator                             │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "Student(string n, int a) : name(n), age(a) { }", explanation: "Parameterized constructor using initializer list", memoryChange: "Object created with given values", output: "None" },
      { line: "~Student() { delete[] grades; }", explanation: "Destructor frees dynamic memory", memoryChange: "Heap memory freed", output: "None" },
    ],
    code: `#include <iostream>
#include <string>
using namespace std;

class Student {
    string name;
    int age;
    int* grades;
    int numGrades;
public:
    // Default constructor
    Student() : name("Unknown"), age(0), grades(nullptr), numGrades(0) {}
    
    // Parameterized constructor
    Student(string n, int a) : name(n), age(a), grades(nullptr), numGrades(0) {}
    
    // Copy constructor
    Student(const Student& other) : name(other.name), age(other.age), numGrades(other.numGrades) {
        grades = new int[numGrades];
        for (int i = 0; i < numGrades; i++) grades[i] = other.grades[i];
    }
    
    // Destructor
    ~Student() { delete[] grades; }
    
    void addGrade(int g) {
        int* newGrades = new int[numGrades + 1];
        for (int i = 0; i < numGrades; i++) newGrades[i] = grades[i];
        newGrades[numGrades] = g;
        delete[] grades;
        grades = newGrades;
        numGrades++;
    }
    
    void display() { cout << name << ", age " << age << endl; }
};

int main() {
    Student s1("Ali", 20);  // parameterized
    Student s2;              // default
    Student s3 = s1;         // copy
    s1.addGrade(95);
    s1.display();
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Constructors & Destructors", content: `// Default: ClassName() {}\n// Parameterized: ClassName(type1 a, type2 b) : member1(a), member2(b) {}\n// Copy: ClassName(const ClassName& other) {}\n// Destructor: ~ClassName() { cleanup; }\n\n// Initializer list (PREFERRED):\nStudent(string n, int a) : name(n), age(a) {}\n\n// Rule of Three: destructor + copy ctor + copy assignment` },
    mistakes: [
      { wrong: "Student(string n) { name = n; }  // assignment in body", correct: "Student(string n) : name(n) { }  // initializer list", explanation: "Initializer list is more efficient — it directly constructs members. Assignment in body first default-constructs then assigns. For const and reference members, initializer list is REQUIRED." },
    ],
    leetcode: { problem: "OOP Concept: Resource Management with RAII", approach: "Use constructor to acquire, destructor to release (RAII pattern).", dryRun: "Object created → resource acquired → object destroyed → resource released", code: "// See code example above", complexity: "O(1) per constructor/destructor call" },
    checkpoint: { question: "When is a destructor automatically called?", options: ["When you call delete", "When the object goes out of scope", "Both A and B", "Never automatically"], answer: 2 }
  },

  "7.3": {
    id: "7.3", title: "Encapsulation", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Private members", "Public interface", "Getters and setters", "Information hiding"],
    story: `**Encapsulation** is like a **vending machine** — you can see the buttons and screen (public interface), but the internal machinery is locked behind a metal panel (private). You interact with the machine only through its buttons — you can't reach inside and rewire it.\n\nIn C++, the **private** keyword hides data from the outside world. The **public** keyword exposes controlled access through getter/setter methods. This protects data integrity — you can validate inputs, add logging, or change internal implementation without breaking external code.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│           ENCAPSULATION — VENDING MACHINE                │
│                                                          │\n│  class BankAccount {                                     │\n│  private:                                                │\n│      double balance;  ← HIDDEN! Can't access directly   │\n│                                                          │\n│  public:                                                 │\n│      void deposit(double amount)  ← CONTROLLED access   │\n│      double getBalance()          ← READ-ONLY access    │\n│  };                                                      │\n│                                                          │\n│  BankAccount acc;                                        │\n│  acc.balance = -1000;  ← ERROR! Private!                │\n│  acc.deposit(500);     ← OK! Goes through validation    │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "class BankAccount { private: double balance; public:", explanation: "Balance is private — hidden from outside", memoryChange: "No memory yet", output: "None" },
      { line: "void deposit(double amt) { if(amt>0) balance+=amt; }", explanation: "Controlled access with validation", memoryChange: "Balance updated only if amount is positive", output: "None" },
      { line: "double getBalance() const { return balance; }", explanation: "Read-only access to private data", memoryChange: "No change", output: "Current balance" },
    ],
    code: `#include <iostream>
using namespace std;

class BankAccount {
    double balance;  // private by default
public:
    BankAccount() : balance(0) {}
    BankAccount(double init) : balance(init) {}
    
    void deposit(double amount) {
        if (amount > 0) balance += amount;
        else cout << "Invalid deposit amount!" << endl;
    }
    
    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        cout << "Invalid withdrawal!" << endl;
        return false;
    }
    
    double getBalance() const { return balance; }
};

int main() {
    BankAccount acc(1000);
    acc.deposit(500);
    acc.withdraw(200);
    cout << "Balance: " << acc.getBalance() << endl;  // 1300
    // acc.balance = -1000;  // ERROR! Private!
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Encapsulation", content: `class ClassName {\n    int privateVar;          // private by default in class\npublic:\n    int getVar() const { return privateVar; }  // getter\n    void setVar(int v) { privateVar = v; }     // setter\n};\n\n// Access specifiers: private, protected, public\n// struct: public by default\n// class: private by default` },
    mistakes: [
      { wrong: "Making all members public", correct: "Keep data private, expose through methods", explanation: "Public data breaks encapsulation — any code can modify it without validation. Always make data private and provide controlled access." },
    ],
    leetcode: { problem: "OOP Concept: Design a Bank Account", approach: "Use encapsulation: private balance, public deposit/withdraw with validation.", dryRun: "Account(1000) → deposit(500) → withdraw(200) → balance=1300", code: "// See code example above", complexity: "O(1) per operation" },
    checkpoint: { question: "What is the default access specifier in a C++ class?", options: ["public", "private", "protected", "none"], answer: 1 }
  },

  "7.4": {
    id: "7.4", title: "Abstraction", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Abstract classes", "Pure virtual functions", "Interface concept", "Hide complexity"],
    story: `**Abstraction** is like driving a car — you know the **steering wheel, gas pedal, and brake** (interface), but you don't need to understand the **engine, transmission, and fuel injection** (implementation details). You interact with a simple interface while the complexity is hidden.\n\nIn C++, **abstract classes** define an interface using **pure virtual functions** (= 0). Derived classes MUST implement these functions. You can't instantiate an abstract class — it's a contract that says "any concrete class derived from me will provide these capabilities."`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│           ABSTRACTION — INTERFACE & IMPLEMENTATION        │
│                                                          │\n│  abstract class Shape {           ← Interface           │\n│      virtual double area() = 0;   ← Pure virtual        │\n│      virtual double perimeter() = 0;                     │\n│  };                                                      │\n│                                                          │\n│  class Circle : public Shape {    ← Implementation      │\n│      double area() override;      ← Must implement      │\n│  };                                                      │\n│                                                          │\n│  class Rectangle : public Shape { ← Another impl        │\n│      double area() override;                              │\n│  };                                                      │\n│                                                          │\n│  Shape* s = new Circle(5);  ← Use interface             │\n│  s->area();                 ← Calls Circle's area       │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "virtual double area() = 0;", explanation: "Pure virtual function — makes class abstract", memoryChange: "No memory — can't instantiate", output: "None" },
      { line: "class Circle : public Shape { double area() override { return pi*r*r; } };", explanation: "Concrete class implements abstract interface", memoryChange: "Circle class provides area implementation", output: "None" },
      { line: "Shape* s = new Circle(5); s->area();", explanation: "Use through abstract pointer — calls Circle's version", memoryChange: "Dynamic dispatch to Circle::area()", output: "78.54" },
    ],
    code: `#include <iostream>
#include <cmath>
using namespace std;

class Shape {
public:
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return M_PI * radius * radius; }
    double perimeter() const override { return 2 * M_PI * radius; }
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() const override { return width * height; }
    double perimeter() const override { return 2 * (width + height); }
};

void printShape(const Shape& s) {
    cout << "Area: " << s.area() << ", Perimeter: " << s.perimeter() << endl;
}

int main() {
    Circle c(5);
    Rectangle r(4, 6);
    printShape(c);  // Area: 78.54, Perimeter: 31.42
    printShape(r);  // Area: 24, Perimeter: 20
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Abstraction", content: `// Abstract class: has at least one pure virtual function\nclass Interface {\n    virtual void method() = 0;  // pure virtual\n};\n\n// Concrete class: implements all pure virtuals\nclass Concrete : public Interface {\n    void method() override { /* implementation */ }\n};\n\n// Use through interface pointer/reference\nInterface* obj = new Concrete();` },
    mistakes: [
      { wrong: "Shape s;  // creating abstract class instance", correct: "Cannot instantiate abstract class! Use concrete derived class.", explanation: "Abstract classes with pure virtual functions cannot be instantiated. Create objects of concrete derived classes instead." },
    ],
    leetcode: { problem: "LeetCode (Design) — Design patterns using abstraction", approach: "Define abstract interface, implement in concrete classes.", dryRun: "Shape interface → Circle and Rectangle implement → polymorphic usage", code: "// See code example above", complexity: "O(1) per virtual call with vtable" },
    checkpoint: { question: "What makes a C++ class abstract?", options: ["Having no members", "Having at least one pure virtual function", "Being in a namespace", "Having private members"], answer: 1 }
  },

  "7.5": {
    id: "7.5", title: "Inheritance", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Single inheritance", "Multilevel inheritance", "Protected members", "IS-A relationship"],
    story: `**Inheritance** is like a **family recipe** passed down through generations. The child gets all the parent's recipes (methods and data) and can add their own twists or override certain dishes. A Student IS-A Person — so Student inherits all of Person's properties (name, age) and adds its own (GPA, student ID).\n\nThe **protected** access specifier is like a family secret — accessible within the class and its children, but not to outsiders. Private is "only for me," protected is "for me and my children," public is "for everyone."`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│        INHERITANCE — IS-A RELATIONSHIP                   │\n│                                                          │\n│  class Person {           ← Parent/Base                 │\n│  protected: string name;                                 │\n│  public: void speak();                                   │\n│  };                                                      │\n│        ↓                                                 │\n│  class Student : public Person {  ← Child/Derived       │\n│  public: double gpa;                                     │\n│      void study();                                       │\n│  };                                                      │\n│                                                          │\n│  Student s;                                              │\n│  s.name = "Ali";   ← inherited from Person              │\n│  s.speak();        ← inherited method                    │\n│  s.gpa = 3.8;      ← Student's own member               │\n│  s.study();        ← Student's own method                │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "class Person { protected: string name; public: void speak() { cout << name; } };", explanation: "Base class with protected data and public method", memoryChange: "No memory — just definition", output: "None" },
      { line: "class Student : public Person { public: double gpa; void study() { cout << name << \" studies\"; } };", explanation: "Derived class inherits from Person, adds own members", memoryChange: "No memory yet", output: "None" },
      { line: "Student s; s.name=\"Ali\"; s.gpa=3.8; s.speak(); s.study();", explanation: "Create Student, use inherited + own members", memoryChange: "Student object with Person+Student data", output: "Ali Ali studies" },
    ],
    code: `#include <iostream>
#include <string>
using namespace std;

class Person {
protected:
    string name;
    int age;
public:
    Person(string n, int a) : name(n), age(a) {}
    void speak() { cout << name << " says hello!" << endl; }
    string getName() const { return name; }
};

class Student : public Person {
    double gpa;
public:
    Student(string n, int a, double g) : Person(n, a), gpa(g) {}
    void study() { cout << name << " is studying (GPA: " << gpa << ")" << endl; }
};

class GraduateStudent : public Student {
    string research;
public:
    GraduateStudent(string n, int a, double g, string r)
        : Student(n, a, g), research(r) {}
    void doResearch() { cout << name << " researches " << research << endl; }
};

int main() {
    Student s("Ali", 20, 3.8);
    s.speak();   // inherited from Person
    s.study();   // Student's own method
    
    GraduateStudent gs("Sara", 25, 3.9, "AI");
    gs.speak();       // from Person
    gs.study();       // from Student
    gs.doResearch();  // own method
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Inheritance", content: `class Derived : public Base {\n    // inherits all public/protected members\n    // can add new members\n    // can override virtual functions\n};\n\n// Constructor calls base constructor:\nDerived(params) : Base(baseParams), ownMember(val) {}\n\n// Access: public, protected, private\n// IS-A: Derived IS-A Base` },
    mistakes: [
      { wrong: "class Student : private Person { }", correct: "class Student : public Person { }", explanation: "Private inheritance makes all inherited members private — you can't use Person's public interface through a Student. Use public inheritance for IS-A relationships." },
    ],
    leetcode: { problem: "OOP Design: Shape hierarchy with inheritance", approach: "Base Shape class, derived Circle, Rectangle, Triangle.", dryRun: "Shape → Circle(5) → area = 78.54", code: "// See abstraction example for shape hierarchy", complexity: "O(1) per object creation" },
    checkpoint: { question: "What does the 'protected' access specifier mean?", options: ["Only the class itself can access", "Class and its children can access", "Everyone can access", "No one can access"], answer: 1 }
  },

  "7.6": {
    id: "7.6", title: "Polymorphism", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Runtime polymorphism", "Virtual functions", "Override", "VTable"],
    story: `**Polymorphism** means "many forms" — the same function call can do different things depending on the object. Imagine pressing the **"play" button** — on a music player it plays a song, on a video player it plays a video, on a game it starts gameplay. Same button, different behavior!\n\nIn C++, polymorphism works through **virtual functions** and **base class pointers/references**. When you call a virtual function through a base pointer, C++ determines the ACTUAL object type at runtime and calls the correct version. This uses a **vtable** (virtual function table) — a hidden lookup table that maps each virtual function to its correct implementation.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│     POLYMORPHISM — SAME INTERFACE, DIFFERENT BEHAVIOR    │
│                                                          │\n│  Shape* shapes[] = { new Circle(5), new Rect(4,6) };    │\n│                                                          │\n│  shapes[0]->area();  → calls Circle::area() = 78.54     │\n│  shapes[1]->area();  → calls Rectangle::area() = 24     │\n│                                                          │\n│  VTABLE (virtual function table):                        │\n│  Circle vtable:  → Circle::area()                       │\n│  Rect vtable:    → Rectangle::area()                    │\n│                                                          │\n│  Each object has hidden vtable pointer → runtime dispatch│\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "Shape* s = new Circle(5);", explanation: "Base pointer to derived object", memoryChange: "Circle object with vtable pointer", output: "None" },
      { line: "s->area();", explanation: "Virtual call — runtime dispatch to Circle::area()", memoryChange: "Vtable lookup performed", output: "78.54" },
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

class Animal {
public:
    virtual string sound() const = 0;
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    string sound() const override { return "Woof!"; }
};

class Cat : public Animal {
public:
    string sound() const override { return "Meow!"; }
};

class Cow : public Animal {
public:
    string sound() const override { return "Moo!"; }
};

int main() {
    vector<Animal*> zoo = { new Dog(), new Cat(), new Cow() };
    for (auto* animal : zoo)
        cout << animal->sound() << endl;  // Woof! Meow! Moo!
    for (auto* a : zoo) delete a;
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Polymorphism", content: `// Base class with virtual function\nclass Base {\n    virtual void func() { /* base impl */ }\n};\n\n// Derived class overrides\nclass Derived : public Base {\n    void func() override { /* derived impl */ }\n};\n\n// Use through base pointer\nBase* ptr = new Derived();\nptr->func();  // calls Derived::func()` },
    mistakes: [
      { wrong: "Forgetting 'virtual' in base class", correct: "Always mark overriding functions as virtual in base", explanation: "Without virtual, the base class version is called instead of the derived version. This is called static binding — the function is determined at compile time, not runtime." },
      { wrong: "Forgetting 'override' keyword in derived class", correct: "Use override to catch errors at compile time", explanation: "The override keyword tells the compiler 'I intend to override a virtual function.' If the base function signature changes, you get a compile error instead of a silent bug." },
    ],
    leetcode: { problem: "OOP Concept: Polymorphic Container", approach: "Store base class pointers in a container, call virtual methods polymorphically.", dryRun: "vector<Shape*> shapes → each computes its own area()", code: "// See Animal example above", complexity: "O(1) per virtual call via vtable" },
    checkpoint: { question: "What enables runtime polymorphism in C++?", options: ["Templates", "Virtual functions + base pointers", "Static functions", "Friend functions"], answer: 1 }
  },

  "7.7": {
    id: "7.7", title: "Virtual Functions", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Virtual keyword", "VTable mechanism", "Pure virtual", "Virtual destructor"],
    story: `**Virtual functions** are the **engine of polymorphism**. When you mark a function as virtual, C++ creates a hidden **vtable** (virtual function table) for that class. Every object gets a secret pointer to its class's vtable. When you call a virtual function through a base pointer, C++ follows this pointer to find the correct function implementation.\n\n**Virtual destructors** are CRITICAL — if you delete a derived object through a base pointer without a virtual destructor, only the base destructor runs, causing resource leaks. Always make destructors virtual in polymorphic base classes!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│          VTABLE — HOW VIRTUAL FUNCTIONS WORK              │
│                                                          │\n│  class Base { virtual void f(); virtual void g(); };    │\n│  class Derived : public Base { void f() override; };     │\n│                                                          │\n│  Base VTable:    [Base::f,    Base::g]                   │\n│  Derived VTable: [Derived::f, Base::g]                   │\n│                                                          │\n│  Base* ptr = new Derived();                              │\n│  ptr->f();  → vtable[0] → Derived::f  ✓                 │\n│  ptr->g();  → vtable[1] → Base::g     ✓                 │\n│                                                          │\n│  VIRTUAL DESTRUCTOR:                                     │\n│  Without: delete ptr → only ~Base() called (LEAK!)       │\n│  With virtual: delete ptr → ~Derived() then ~Base() ✓   │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "virtual ~Base() { cout << \"Base dtor\"; }", explanation: "Virtual destructor ensures derived destructor is called", memoryChange: "Vtable includes destructor entry", output: "None" },
      { line: "virtual void draw() = 0;", explanation: "Pure virtual — must be overridden", memoryChange: "Makes class abstract", output: "None" },
    ],
    code: `#include <iostream>
using namespace std;

class Base {
public:
    virtual void show() { cout << "Base show" << endl; }
    virtual ~Base() { cout << "Base destructor" << endl; }
};

class Derived : public Base {
    int* data;
public:
    Derived() { data = new int[100]; }
    void show() override { cout << "Derived show" << endl; }
    ~Derived() override { delete[] data; cout << "Derived destructor" << endl; }
};

int main() {
    Base* ptr = new Derived();
    ptr->show();  // "Derived show" (virtual dispatch)
    delete ptr;   // "Derived destructor" then "Base destructor" (virtual dtor)
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Virtual Functions", content: `// Virtual function:\nvirtual void func();\n\n// Pure virtual (abstract):\nvirtual void func() = 0;\n\n// Override in derived:\nvoid func() override;\n\n// Virtual destructor (ALWAYS for polymorphic bases):\nvirtual ~ClassName() = default;\n\n// Small overhead: one vtable pointer per object` },
    mistakes: [
      { wrong: "Non-virtual destructor in polymorphic base class", correct: "Always use virtual ~Base() for polymorphic classes", explanation: "Without virtual destructor, deleting through base pointer only calls base destructor — derived resources leak. This is the #1 cause of memory leaks in OOP C++." },
    ],
    leetcode: { problem: "OOP Concept: Virtual Function Dispatch", approach: "Use virtual functions for polymorphic behavior through base pointers.", dryRun: "Base* p = new Derived(); p->func() → calls Derived::func", code: "// See code example above", complexity: "O(1) via vtable lookup" },
    checkpoint: { question: "Why must destructors be virtual in polymorphic base classes?", options: ["For performance", "To ensure derived destructor is called when deleting through base pointer", "It's optional", "To prevent compilation"], answer: 1 }
  },

  "7.8": {
    id: "7.8", title: "Operator Overloading", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Overload +, -, *, ==", "Friend functions", "Stream operators", "Comparison operators"],
    story: `**Operator overloading** lets your custom types work with built-in operators like +, -, ==, <<. Imagine you have a **Money** class — you want to write \`price1 + price2\` instead of \`price1.add(price2)\`. Operator overloading makes your classes feel like built-in types!\n\nYou can overload most operators: arithmetic (+, -, *, /), comparison (==, <, >), stream (<<, >>), subscript ([]), and more. But you CAN'T overload ::, ., .*, or ?:.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│     OPERATOR OVERLOADING — CUSTOM + FOR MONEY            │
│                                                          │\n│  Money a(10,50) + Money b(5,25) → Money(15,75)          │\n│                                                          │\n│  Money operator+(const Money& other) {                   │\n│      return Money(dollars + other.dollars,               │\n│                    cents + other.cents);                 │\n│  }                                                       │\n│                                                          │\n│  COMMON OPERATORS TO OVERLOAD:                           │\n│  Arithmetic: + - * / %                                   │\n│  Comparison: == != < > <= >=                             │\n│  Stream: << >> (as friend functions)                     │\n│  Subscript: []                                           │\n│  Assignment: = (special rules)                           │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "Money operator+(const Money& other) const { return Money(d+other.d, c+other.c); }", explanation: "Define + operator for Money class", memoryChange: "New Money object created", output: "None" },
      { line: "bool operator==(const Money& other) const { return d==other.d && c==other.c; }", explanation: "Define == comparison", memoryChange: "No change", output: "true/false" },
    ],
    code: `#include <iostream>
using namespace std;

class Money {
    int dollars, cents;
public:
    Money(int d = 0, int c = 0) : dollars(d), cents(c) {}
    
    Money operator+(const Money& other) const {
        int totalCents = (dollars * 100 + cents) + (other.dollars * 100 + other.cents);
        return Money(totalCents / 100, totalCents % 100);
    }
    
    bool operator==(const Money& other) const {
        return dollars == other.dollars && cents == other.cents;
    }
    
    bool operator<(const Money& other) const {
        return (dollars * 100 + cents) < (other.dollars * 100 + other.cents);
    }
    
    friend ostream& operator<<(ostream& os, const Money& m) {
        os << "$" << m.dollars << "." << (m.cents < 10 ? "0" : "") << m.cents;
        return os;
    }
};

int main() {
    Money a(10, 50), b(5, 75);
    cout << a + b << endl;     // $16.25
    cout << (a == b) << endl;  // 0
    cout << (a < b) << endl;   // 0
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Operator Overloading", content: `// Member function:\nReturnType operator+(const Type& other) const;\n\n// Friend function (for <<, >>):\nfriend ostream& operator<<(ostream& os, const Type& obj);\n\n// Comparison (C++20 spaceship operator):\nauto operator<=>(const Type&) const = default;` },
    mistakes: [
      { wrong: "Money operator+(int x) { ... } // modifying this", correct: "Money operator+(const Money& other) const { ... }", explanation: "Binary operators should take the other operand as parameter and return a new object. Mark const to prevent modification of the left operand." },
    ],
    leetcode: { problem: "OOP Design: Complex number class with operator overloading", approach: "Overload +, -, *, /, ==, << for Complex numbers.", dryRun: "Complex(1,2) + Complex(3,4) = Complex(4,6)", code: "// Similar to Money example above", complexity: "O(1) per operation" },
    checkpoint: { question: "Which operators CANNOT be overloaded in C++?", options: ["+, -, *", "==, !=", "::, ., .*, ?:", "<<, >>"], answer: 2 }
  },

  "7.9": {
    id: "7.9", title: "Friend Functions & Classes", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Friend function", "Friend class", "Breaking encapsulation carefully"],
    story: `A **friend** is like giving someone a **master key** to your house — they can access your private rooms, but they're not family (not a member). Use friends sparingly: they're needed for operator<< (stream output) and when two classes are tightly coupled.\n\nFriendship is GRANTED, not TAKEN — class A declares "B is my friend," not "I am B's friend." This means B can access A's privates, but A can't access B's unless B also declares A as friend.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  class Matrix {                                          │\n│      int data[4][4];  // private                        │\n│      friend Matrix operator*(const Matrix& a, const Matrix& b);\n│      friend class Vector;  // Vector can access private  │\n│  };                                                      │\n│  friendship is NOT mutual and NOT inherited              │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "friend ostream& operator<<(ostream& os, const MyClass& obj);", explanation: "Declare friend function to access private data", memoryChange: "No change — just declaration", output: "None" },
    ],
    code: `#include <iostream>
using namespace std;

class Box {
    double width;
public:
    Box(double w) : width(w) {}
    friend void printWidth(const Box& b);  // friend function
    friend class BoxUtils;                  // friend class
};

void printWidth(const Box& b) {
    cout << "Width: " << b.width << endl;  // can access private!
}

class BoxUtils {
public:
    static double doubleWidth(const Box& b) {
        return b.width * 2;  // can access private!
    }
};

int main() {
    Box b(10.5);
    printWidth(b);                    // Width: 10.5
    cout << BoxUtils::doubleWidth(b) << endl;  // 21
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Friends", content: `// Friend function:\nfriend ReturnType funcName(params);\n\n// Friend class:\nfriend class ClassName;\n\n// Friendship is:\n// - NOT mutual (A friends B ≠ B friends A)\n// - NOT inherited\n// - NOT transitive (A friends B, B friends C ≠ A friends C)` },
    mistakes: [
      { wrong: "Assuming friendship is mutual", correct: "Friendship must be explicitly declared by each class", explanation: "If class A declares B as friend, B can access A's privates. But A cannot access B's privates unless B also declares A as friend." },
    ],
    leetcode: { problem: "OOP Concept: Friend for Stream Operators", approach: "Use friend functions for operator<< and operator>> to access private data.", dryRun: "cout << obj → friend function accesses private members", code: "// See operator overloading example with friend <<", complexity: "O(1)" },
    checkpoint: { question: "Is friendship in C++ mutual?", options: ["Yes, always", "No, it must be declared by each class", "Only for friend classes", "Only for friend functions"], answer: 1 }
  },

  "7.10": {
    id: "7.10", title: "Static Members", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Static variables", "Static functions", "Shared across instances", "Counting objects"],
    story: `A **static member** is like a **shared whiteboard** in an office — all employees (objects) can see and modify it, but there's only ONE copy. Regular members are like personal notebooks — each employee has their own.\n\nStatic variables are shared across ALL instances of a class. They're perfect for counting objects, storing class-wide settings, or implementing singleton patterns. Static functions can only access static members — they don't have a 'this' pointer.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  class Counter {                                         │\n│      static int count;  // ONE copy shared by all       │\n│      int id;            // each object has its own      │\n│  };                                                      │\n│                                                          │\n│  Counter a, b, c;                                        │\n│  a.count = 1;  →  b.count = 1, c.count = 1 (same!)     │\n│  a.id = 1;     →  b.id ≠ a.id  (different!)            │\n│                                                          │\n│  Counter::count;  // access without object               │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "static int count; // declaration in class", explanation: "Declare static member — shared across all objects", memoryChange: "No memory yet — must define outside class", output: "None" },
      { line: "int Counter::count = 0; // definition outside class", explanation: "Define and initialize static member", memoryChange: "Single copy in static memory", output: "None" },
      { line: "static int getCount() { return count; }", explanation: "Static function accesses only static members", memoryChange: "No this pointer", output: "count value" },
    ],
    code: `#include <iostream>
using namespace std;

class Employee {
    static int count;
    int id;
public:
    Employee() : id(++count) { cout << "Employee " << id << " created" << endl; }
    ~Employee() { cout << "Employee " << id << " destroyed" << endl; }
    static int getCount() { return count; }
};

int Employee::count = 0;

int main() {
    cout << "Count: " << Employee::getCount() << endl;  // 0
    Employee e1, e2, e3;
    cout << "Count: " << Employee::getCount() << endl;  // 3
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Static Members", content: `// Declaration (in class):\nstatic type var;\nstatic type func();\n\n// Definition (outside class):\ntype ClassName::var = initialValue;\n\n// Access:\nClassName::staticVar;\nClassName::staticFunc();\n\n// Static functions: no 'this', only access static members` },
    mistakes: [
      { wrong: "Defining static member inside class", correct: "Declare in class, define OUTSIDE class (except const integral)", explanation: "Static members must be defined exactly once outside the class. The class declaration just declares them. Exception: const static int can be initialized in-class." },
    ],
    leetcode: { problem: "OOP Design: Singleton Pattern", approach: "Use static instance and private constructor to ensure only one object exists.", dryRun: "Singleton::getInstance() always returns same object", code: "class Singleton {\n    static Singleton* instance;\n    Singleton() {}  // private constructor\npublic:\n    static Singleton* getInstance() {\n        if (!instance) instance = new Singleton();\n        return instance;\n    }\n};\nSingleton* Singleton::instance = nullptr;", complexity: "O(1) getInstance" },
    checkpoint: { question: "What does a static function NOT have access to?", options: ["Static variables", "Non-static (instance) members", "Other static functions", "Global variables"], answer: 1 }
  },

  "7.11": {
    id: "7.11", title: "Templates in OOP", phaseId: "phase-7", phaseTitle: "Object Oriented Programming",
    subtopics: ["Class templates", "Template specialization", "Generic programming with OOP"],
    story: `Imagine a **cookie cutter** — one cutter shape makes cookies from different doughs (chocolate, vanilla, gingerbread). **Class templates** work the same way — one class definition works with different types!\n\nTemplates + OOP = incredibly powerful generic programming. You can create a Stack<T> that works for int, string, or any custom type. The compiler generates a separate class for each type you use, so there's zero runtime overhead.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  template<typename T>                                    │\n│  class Stack {                                           │\n│      vector<T> data;  ← T can be ANY type               │\n│  public:                                                 │\n│      void push(T val);                                   │\n│      T pop();                                            │\n│  };                                                      │\n│                                                          │\n│  Stack<int> s1;      ← T=int, stores ints               │\n│  Stack<string> s2;   ← T=string, stores strings         │\n│  Stack<Student> s3;  ← T=Student, stores Students       │\n│  Each is a DIFFERENT class generated by compiler         │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "template<typename T> class Box { T value; public: Box(T v) : value(v) {} T get() { return value; } };", explanation: "Generic class that works with any type T", memoryChange: "No memory until instantiated", output: "None" },
      { line: "Box<int> b1(42); Box<string> b2(\"hello\");", explanation: "Compiler generates Box<int> and Box<string> classes", memoryChange: "Two different Box objects created", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

template<typename T>
class Stack {
    vector<T> data;
public:
    void push(const T& val) { data.push_back(val); }
    void pop() { if (!empty()) data.pop_back(); }
    T top() const { return data.back(); }
    bool empty() const { return data.empty(); }
    int size() const { return data.size(); }
};

int main() {
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    cout << intStack.top() << endl;  // 20
    
    Stack<string> strStack;
    strStack.push("hello");
    strStack.push("world");
    cout << strStack.top() << endl;  // world
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Class Templates", content: `template<typename T>\nclass ClassName {\n    T member;\npublic:\n    ClassName(T val) : member(val) {}\n    T method();\n};\n\n// Specialization:\ntemplate<> class ClassName<int> { /* int-specific */ };\n\n// Multiple types:\ntemplate<typename T, typename U>` },
    mistakes: [
      { wrong: "Putting template implementation in .cpp file", correct: "Keep template implementation in header file", explanation: "The compiler needs to see the full template definition to generate code for each type. Putting implementations in .cpp causes linker errors." },
    ],
    leetcode: { problem: "OOP Design: Generic Container", approach: "Create a template class that works with any type.", dryRun: "Stack<int> and Stack<string> from same template", code: "// See code example above", complexity: "O(1) push/pop, zero template overhead at runtime" },
    checkpoint: { question: "Where should template class implementations be placed?", options: [".cpp files", "Header files (.h/.hpp)", "Separate .tpp files", "It doesn't matter"], answer: 1 }
  }
};

export const phase8Content: Record<string, Topic> = {
  "8.1": {
    id: "8.1", title: "LeetCode Problem Track", phaseId: "phase-8", phaseTitle: "Interview Preparation",
    subtopics: ["Easy problems", "Medium problems", "Problem patterns", "Practice strategy"],
    story: `Think of LeetCode like a **gym** for programmers. You don't walk in and try to bench press 300 pounds on day one. You start with the **easy** machines, build strength, and gradually increase the weight.\n\nThe key strategy: **don't solve random problems**. Follow the **Blind 75** or **NeetCode 150** lists — organized by pattern. Master each pattern (sliding window, two pointers, BFS, etc.) before moving to the next. Quality practice beats quantity!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│          LEETCODE PRACTICE ROADMAP                       │
│                                                          │\n│  Phase 1: Arrays & Strings (Easy)                       │\n│  Phase 2: Linked Lists & Trees (Easy-Medium)            │\n│  Phase 3: Graphs & BFS/DFS (Medium)                     │\n│  Phase 4: Dynamic Programming (Medium-Hard)             │\n│  Phase 5: Mock Interviews (Mixed)                       │\n│                                                          │\n│  TARGET: 150 problems = solid interview prep             │\n│  75 problems = minimum for most interviews               │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "// Start with Array/String Easy problems", explanation: "Build foundation with Two Sum, Reverse String, etc.", memoryChange: "Pattern recognition building", output: "Confidence growing" },
      { line: "// Move to pattern-based practice", explanation: "Group by pattern: sliding window, two pointers, BFS", memoryChange: "Pattern library forming", output: "Speed improving" },
    ],
    code: `// LeetCode Practice Strategy
// 1. Two Sum (#1) - Hash Map
// 2. Valid Parentheses (#20) - Stack
// 3. Merge Two Sorted Lists (#21) - Linked List
// 4. Best Time to Buy/Sell Stock (#121) - One Pass
// 5. Valid Anagram (#242) - Frequency Count
// 6. Maximum Subarray (#53) - Kadane's Algorithm
// 7. Binary Search (#704) - Binary Search
// 8. Climbing Stairs (#70) - DP
// 9. Number of Islands (#200) - BFS/DFS
// 10. Word Break (#139) - DP + Trie`,
    syntaxCard: { title: "SYNTAX: LeetCode Strategy", content: `// Blind 75 → NeetCode 150 → Company-specific\n// Time: 2-3 problems/day\n// Focus: understand pattern, not memorize solution\n// Mock interview weekly after 50+ problems` },
    mistakes: [
      { wrong: "Solving 500 random problems", correct: "Master patterns through organized lists", explanation: "Random practice doesn't build pattern recognition. Organized lists help you recognize patterns in new problems." },
    ],
    leetcode: { problem: "Practice Organization", approach: "Follow NeetCode 150 or Blind 75 for structured prep.", dryRun: "2-3 problems/day × 60 days = 150 problems mastered", code: "// Practice is the code!", complexity: "Time: O(daily_practice × months)" },
    checkpoint: { question: "What's the recommended approach for LeetCode practice?", options: ["Solve random problems", "Follow organized pattern-based lists", "Only solve hard problems", "Memorize solutions"], answer: 1 }
  },

  "8.2": {
    id: "8.2", title: "C++ Interview Questions", phaseId: "phase-8", phaseTitle: "Interview Preparation",
    subtopics: ["Memory management", "Pointers & references", "STL questions", "Compilation process"],
    story: `C++ interviews test your **deep understanding** of how things work under the hood. They'll ask about memory layout, pointers vs references, virtual functions, RAII, move semantics, and more. The key is not just knowing the answer but understanding WHY — interviewers love follow-up questions!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│       TOP C++ INTERVIEW QUESTIONS                        │\n│  1. What's the difference between pointer & reference?  │\n│  2. What is RAII?                                       │\n│  3. Explain virtual functions and vtable                │\n│  4. What is the rule of three/five?                     │\n│  5. Difference between stack and heap?                  │\n│  6. What is move semantics?                              │\n│  7. Explain smart pointers                              │\n│  8. What does const mean in different positions?         │\n│  9. What is undefined behavior?                         │\n│  10. Explain template specialization                    │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "// Q: Pointer vs Reference?", explanation: "Pointer can be null/reassigned, reference cannot", memoryChange: "Understanding deepened", output: "Interview ready" },
    ],
    code: `// Common C++ Interview Answers:
// 1. Pointer vs Reference:
//    - Pointer: can be null, can be reassigned, uses * and ->
//    - Reference: cannot be null, cannot be reassigned, alias syntax

// 2. RAII: Resource Acquisition Is Initialization
//    - Acquire in constructor, release in destructor
//    - Example: smart pointers, lock_guard, fstream

// 3. Virtual Functions & VTable:
//    - Virtual → runtime dispatch via vtable
//    - Each object has hidden vtable pointer
//    - Virtual destructor ensures proper cleanup

// 4. Rule of Three/Five:
//    - If you define destructor, copy ctor, or copy assignment
//    - You should define ALL three (five with move semantics)

// 5. Stack vs Heap:
//    - Stack: automatic, fast, limited size
//    - Heap: manual (new/delete), slower, large`,
    syntaxCard: { title: "SYNTAX: C++ Interview Prep", content: `// Key topics: memory, pointers, OOP, templates, STL\n// Practice explaining concepts out loud\n// Be ready for "what happens if" follow-ups` },
    mistakes: [
      { wrong: "Memorizing answers without understanding", correct: "Understand the WHY behind each concept", explanation: "Interviewers always follow up with 'why?' or 'what if?' scenarios. Deep understanding beats memorized answers." },
    ],
    leetcode: { problem: "C++ Interview Preparation", approach: "Review core concepts, practice explaining them clearly.", dryRun: "Q&A practice with friend or mock interviewer", code: "// See code example above", complexity: "O(preparation_time)" },
    checkpoint: { question: "What does RAII stand for?", options: ["Random Access Integer Index", "Resource Acquisition Is Initialization", "Reference And Instance Inheritance", "Runtime Allocation In Interface"], answer: 1 }
  },

  "8.3": {
    id: "8.3", title: "OOP Interview Questions", phaseId: "phase-8", phaseTitle: "Interview Preparation",
    subtopics: ["Four pillars", "Design patterns", "SOLID principles", "Real-world examples"],
    story: `OOP interviews love asking about the **four pillars**: Encapsulation, Abstraction, Inheritance, Polymorphism. But they go deeper — SOLID principles, design patterns, and when NOT to use inheritance (composition over inheritance!).`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  FOUR PILLARS: Encapsulation, Abstraction,              │\n│                Inheritance, Polymorphism                 │\n│  SOLID: Single Responsibility, Open/Closed,             │\n│         Liskov Substitution, Interface Segregation,     │\n│         Dependency Inversion                             │\n│  PATTERNS: Singleton, Factory, Observer, Strategy       │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "// Q: Explain polymorphism with example", explanation: "Same interface, different behavior — virtual functions", memoryChange: "Interview concept review", output: "Ready for OOP questions" },
    ],
    code: `// OOP Interview Answers:
// 1. Encapsulation: hide data, expose interface
// 2. Abstraction: hide complexity, show essentials
// 3. Inheritance: code reuse through IS-A relationship
// 4. Polymorphism: same interface, different implementations
//
// SOLID Principles:
// S - Single Responsibility: one class, one job
// O - Open/Closed: open for extension, closed for modification
// L - Liskov Substitution: derived must be substitutable for base
// I - Interface Segregation: small, focused interfaces
// D - Dependency Inversion: depend on abstractions, not concretions
//
// Composition over Inheritance:
// class Car { Engine engine; }  // HAS-A (composition)
// NOT: class Car : public Engine  // IS-A (inheritance)`,
    syntaxCard: { title: "SYNTAX: OOP Interview Prep", content: `// Four pillars + SOLID + Design Patterns\n// Always give real-world examples\n// Know when to use composition vs inheritance` },
    mistakes: [
      { wrong: "Using inheritance for code reuse only", correct: "Use inheritance only for IS-A relationships", explanation: "Inheritance creates tight coupling. If there's no IS-A relationship, use composition (HAS-A) instead for flexibility." },
    ],
    leetcode: { problem: "OOP Interview Questions", approach: "Practice explaining the four pillars with real examples.", dryRun: "Explain encapsulation using BankAccount example", code: "// See code above", complexity: "O(1)" },
    checkpoint: { question: "What does the 'L' in SOLID stand for?", options: ["Lazy Loading", "Liskov Substitution", "Layered Architecture", "Loose Coupling"], answer: 1 }
  },

  "8.4": {
    id: "8.4", title: "DSA Interview Questions", phaseId: "phase-8", phaseTitle: "Interview Preparation",
    subtopics: ["Time complexity analysis", "Common data structures", "Algorithm patterns", "Whiteboard tips"],
    story: `DSA interviews are like **martial arts belt tests** — you need to demonstrate technique under pressure. The key is: clarify the problem, think aloud, start with brute force, optimize step by step, and code cleanly.\n\nTop tips: Always ask about constraints and edge cases first. Start with the simplest approach, explain why it's suboptimal, then improve. Interviewers care about your THOUGHT PROCESS as much as the final answer.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│         DSA INTERVIEW FRAMEWORK                          │\n│  1. Understand (ask clarifying questions)                │\n│  2. Examples (walk through test cases)                   │\n│  3. Brute Force (first working solution)                 │\n│  4. Optimize (identify pattern, improve)                 │\n│  5. Code (clean, readable implementation)                │\n│  6. Test (verify with edge cases)                        │\n│                                                          │\n│  Time Complexities to Know:                              │\n│  O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "// Step 1: Clarify the problem", explanation: "Ask about input size, constraints, edge cases", memoryChange: "Problem understanding", output: "Clear requirements" },
      { line: "// Step 2: Start with brute force", explanation: "Simple working solution first, then optimize", memoryChange: "Solution drafted", output: "Working code" },
    ],
    code: `// DSA Interview Strategy:
// 1. Clarify: "Can the array have duplicates? Negative numbers?"
// 2. Examples: "Let me trace through with input [3,1,4,1,5]"
// 3. Brute Force: "The simplest approach is O(n^2) with nested loops"
// 4. Optimize: "We can improve to O(n) using a hash map"
// 5. Code: Write clean, well-named code
// 6. Test: "Let me verify with the example and an edge case"`,
    syntaxCard: { title: "SYNTAX: DSA Interview Tips", content: `// Clarify → Examples → Brute Force → Optimize → Code → Test\n// Big O: know O(1) through O(n!)\n// Practice: explain approach before coding\n// Edge cases: empty input, single element, duplicates` },
    mistakes: [
      { wrong: "Jumping straight to the optimal solution", correct: "Start with brute force, explain optimization steps", explanation: "Interviewers want to see your problem-solving process. Starting with brute force shows you can find ANY solution, then optimizing shows you can make it better." },
    ],
    leetcode: { problem: "DSA Interview Practice", approach: "Practice the 6-step framework on real problems.", dryRun: "Clarify → Example → Brute Force → Optimize → Code → Test", code: "// Framework is the code!", complexity: "O(interview_skill)" },
    checkpoint: { question: "What should you do FIRST in a coding interview?", options: ["Start coding immediately", "Ask clarifying questions about the problem", "Write the optimal solution", "Explain time complexity"], answer: 1 }
  },

  "8.5": {
    id: "8.5", title: "System Design Basics", phaseId: "phase-8", phaseTitle: "Interview Preparation",
    subtopics: ["Scalability", "Load balancing", "Caching", "Database basics"],
    story: `System design interviews are like being an **architect** — instead of building one house, you're designing a **city**. How do you handle millions of users? What if a server crashes? How do you store petabytes of data?\n\nKey concepts: **Horizontal scaling** (add more machines) vs **Vertical scaling** (bigger machine). **Load balancers** distribute traffic. **Caches** store frequently accessed data. **Databases** persist data reliably. **CDNs** serve content from nearby locations.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│        SYSTEM DESIGN — HIGH-LEVEL ARCHITECTURE           │\n│                                                          │\n│  Users → CDN → Load Balancer → [Server1, Server2, ...]  │\n│                                    ↓                     │\n│                                  Cache (Redis)           │\n│                                    ↓                     │\n│                              [DB Primary] → [DB Replica] │\n│                                                          │\n│  KEY NUMBERS:                                            │\n│  L1 cache: 1ns   |  SSD: 0.1ms                          │\n│  Memory: 100ns   |  Network: 1-10ms                      │\n│  Disk: 10ms      |  Internet: 100ms+                     │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "// Estimate: QPS, storage, bandwidth", explanation: "Back-of-envelope calculations for scale", memoryChange: "Requirements clarified", output: "Scale estimates" },
      { line: "// Design: API, database schema, architecture", explanation: "High-level components and data flow", memoryChange: "Architecture designed", output: "System design diagram" },
    ],
    code: `// System Design Framework:
// 1. Requirements: functional + non-functional
// 2. Estimation: users, QPS, storage, bandwidth
// 3. API Design: endpoints, request/response format
// 4. Database Schema: tables, relationships
// 5. High-Level Design: components, data flow
// 6. Deep Dive: bottlenecks, trade-offs
// 7. Scale: caching, sharding, replication`,
    syntaxCard: { title: "SYNTAX: System Design", content: `// Requirements → Estimate → API → DB → Architecture → Deep Dive\n// Key numbers: know latency figures\n// Patterns: load balancer, cache, message queue, sharding` },
    mistakes: [
      { wrong: "Designing without estimating scale", correct: "Always estimate QPS, storage, bandwidth first", explanation: "Without scale estimates, you might design for 100 users when you need 100 million. Always clarify the expected scale before designing." },
    ],
    leetcode: { problem: "System Design: Design URL Shortener", approach: "Requirements → API → DB → Encoding → Scale", dryRun: "tinyurl.com/abc123 → redirect to long URL", code: "// System design is diagram + discussion", complexity: "O(scale)" },
    checkpoint: { question: "What is horizontal scaling?", options: ["Buying a bigger server", "Adding more servers", "Adding more memory", "Optimizing code"], answer: 1 }
  },

  "8.6": {
    id: "8.6", title: "DBMS Quick Revision", phaseId: "phase-8", phaseTitle: "Interview Preparation",
    subtopics: ["SQL basics", "Normalization", "ACID properties", "Indexes"],
    story: `A database is like a **super-organized filing cabinet** — it stores data reliably, lets you search it quickly, and handles concurrent access safely. Key concepts: **SQL** (Structured Query Language) for interacting with data, **Normalization** to eliminate redundancy, **ACID** properties for reliable transactions, and **Indexes** for fast lookups.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  ACID: Atomicity, Consistency, Isolation, Durability     │\n│  NORMAL FORMS: 1NF → 2NF → 3NF → BCNF                   │\n│  INDEX: B-tree index for O(log n) lookups                │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "SELECT name FROM students WHERE gpa > 3.5;", explanation: "Basic SQL query", memoryChange: "Query executed", output: "Filtered results" },
    ],
    code: `// SQL Basics:
// SELECT columns FROM table WHERE condition
// INSERT INTO table VALUES (...)
// UPDATE table SET col=val WHERE condition
// DELETE FROM table WHERE condition
// JOIN: INNER, LEFT, RIGHT, FULL
// GROUP BY + HAVING + aggregate functions
// INDEX: CREATE INDEX idx ON table(column)`,
    syntaxCard: { title: "SYNTAX: DBMS Quick Reference", content: `// ACID: Atomicity, Consistency, Isolation, Durability\n// Normalization: reduce redundancy\n// Indexes: B-tree for fast lookup\n// Transactions: BEGIN, COMMIT, ROLLBACK` },
    mistakes: [
      { wrong: "No indexes on frequently queried columns", correct: "Create indexes on WHERE/JOIN columns", explanation: "Without indexes, the database does full table scans (O(n)). Indexes reduce this to O(log n) for lookups." },
    ],
    leetcode: { problem: "SQL Practice: LeetCode Database problems", approach: "Practice SELECT, JOIN, GROUP BY on real problems.", dryRun: "Find top earners per department", code: "// SQL practice on LeetCode", complexity: "Varies by query" },
    checkpoint: { question: "What does ACID stand for?", options: ["Add, Create, Insert, Delete", "Atomicity, Consistency, Isolation, Durability", "Access, Control, Identity, Data", "Auto, Commit, Index, Drop"], answer: 1 }
  },

  "8.7": {
    id: "8.7", title: "OS Quick Revision", phaseId: "phase-8", phaseTitle: "Interview Preparation",
    subtopics: ["Process vs Thread", "Scheduling", "Memory management", "Deadlocks"],
    story: `An OS is like a **restaurant manager** — it manages resources (CPU time, memory, disk), coordinates workers (processes/threads), and ensures everyone gets served fairly. Key concepts: **Process** is a running program, **Thread** is a lightweight process sharing memory, **Deadlock** is when everyone waits for each other forever.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  PROCESS vs THREAD                                       │\n│  Process: own memory space, isolated                     │\n│  Thread: shared memory, lightweight                      │\n│                                                          │\n│  DEADLOCK conditions: Mutual exclusion, Hold & Wait,     │\n│  No preemption, Circular wait                            │\n│                                                          │\n│  MEMORY: Virtual memory, paging, page faults             │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "// Process: independent execution unit", explanation: "Has own memory, code, data sections", memoryChange: "Separate address space", output: "Isolation" },
    ],
    code: `// OS Key Concepts:
// Process vs Thread: process has own memory, thread shares
// Scheduling: FCFS, SJF, Round Robin, Priority
// Deadlock: 4 conditions (mutual exclusion, hold&wait, no preemption, circular wait)
// Memory: virtual memory, paging, page replacement (LRU, FIFO)
// Synchronization: mutex, semaphore, monitor
// IPC: pipes, shared memory, message passing`,
    syntaxCard: { title: "SYNTAX: OS Quick Reference", content: `// Process vs Thread, Deadlock, Scheduling\n// Memory: virtual, paging, segmentation\n// Sync: mutex, semaphore\n// IPC: pipe, shared memory, signals` },
    mistakes: [
      { wrong: "Confusing process with thread", correct: "Process = isolated, Thread = shared memory", explanation: "A process has its own address space. Threads within a process share memory, making communication faster but requiring synchronization." },
    ],
    leetcode: { problem: "OS Interview Prep", approach: "Understand concepts and practice explaining them.", dryRun: "Explain deadlock with dining philosophers example", code: "// Conceptual understanding", complexity: "O(1)" },
    checkpoint: { question: "How many conditions must be true for deadlock to occur?", options: ["2", "3", "4", "1"], answer: 2 }
  },

  "8.8": {
    id: "8.8", title: "Computer Networks", phaseId: "phase-8", phaseTitle: "Interview Preparation",
    subtopics: ["OSI model", "TCP/IP", "HTTP", "DNS"],
    story: `Computer networks are like a **postal system** for data. The **OSI model** defines 7 layers of how data travels: from your application (letter), through transport (envelope), network (sorting), down to physical (truck). **TCP/IP** is the practical version used on the internet — reliable delivery with error checking.\n\n**HTTP** is the language web browsers speak — you send a REQUEST (GET me this page) and receive a RESPONSE (here's the HTML). **DNS** is the phonebook — translates google.com to 142.250.80.46.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  OSI MODEL: 7 Layers                                    │\n│  7. Application  ← HTTP, FTP, DNS                       │\n│  6. Presentation  ← SSL/TLS, encoding                   │\n│  5. Session       ← connection management               │\n│  4. Transport     ← TCP (reliable), UDP (fast)          │\n│  3. Network       ← IP, routing                         │\n│  2. Data Link     ← MAC, switches                       │\n│  1. Physical      ← cables, signals                     │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "// HTTP Request: GET /index.html HTTP/1.1", explanation: "Client requests a web page", memoryChange: "Request sent over TCP", output: "HTTP Response" },
    ],
    code: `// Network Concepts:
// OSI 7 layers vs TCP/IP 4 layers
// TCP: 3-way handshake, reliable, ordered
// UDP: no handshake, fast, no guarantee
// HTTP: request/response, methods (GET, POST, PUT, DELETE)
// DNS: domain → IP address translation
// Status codes: 200 OK, 301 Redirect, 404 Not Found, 500 Server Error`,
    syntaxCard: { title: "SYNTAX: Networking Quick Reference", content: `// OSI: 7 layers (Application to Physical)\n// TCP: reliable, 3-way handshake\n// HTTP: GET/POST/PUT/DELETE\n// DNS: domain → IP translation` },
    mistakes: [
      { wrong: "Thinking TCP is faster than UDP", correct: "UDP is faster but unreliable; TCP is reliable but slower", explanation: "TCP guarantees delivery and ordering through handshakes and acknowledgments, which adds overhead. UDP skips all that for speed." },
    ],
    leetcode: { problem: "Networking Interview Prep", approach: "Know OSI layers, TCP vs UDP, HTTP methods, DNS.", dryRun: "Explain what happens when you type google.com", code: "// Conceptual understanding", complexity: "O(1)" },
    checkpoint: { question: "How many layers does the OSI model have?", options: ["4", "5", "6", "7"], answer: 3 }
  },

  "8.9": {
    id: "8.9", title: "Mock Interview Simulator", phaseId: "phase-8", phaseTitle: "Interview Preparation",
    subtopics: ["45-minute format", "Communication skills", "Problem-solving under pressure", "Self-assessment"],
    story: `A mock interview is like a **dress rehearsal** before the big performance. You simulate real interview conditions: 45 minutes, a problem you haven't seen, thinking out loud, writing clean code on a whiteboard (or shared editor). The goal isn't perfection — it's building the **muscle memory** of structured problem-solving under pressure.\n\nRecord yourself or practice with a friend. After each mock, review: Did I clarify the problem? Did I consider edge cases? Was my code clean? Did I test it? Improvement comes from honest self-assessment!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│        45-MINUTE MOCK INTERVIEW FORMAT                   │\n│                                                          │\n│  0-5 min:   Understand problem, ask questions            │\n│  5-10 min:  Walk through examples                        │\n│  10-15 min: Discuss approach, complexity                 │\n│  15-30 min: Code the solution                            │\n│  30-40 min: Test with examples, fix bugs                 │\n│  40-45 min: Discuss optimizations, follow-ups            │\n│                                                          │\n│  SELF-ASSESSMENT:                                        │\n│  ✓ Clarified problem?   ✓ Edge cases?                   │\n│  ✓ Optimal solution?    ✓ Clean code?                    │\n│  ✓ Tested thoroughly?   ✓ Good communication?            │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "// Read problem, ask 3+ clarifying questions", explanation: "Understand before solving", memoryChange: "Problem scope defined", output: "Clear understanding" },
      { line: "// Write code, narrate thought process", explanation: "Code while explaining your reasoning", memoryChange: "Solution taking shape", output: "Working code" },
      { line: "// Test with examples + edge cases", explanation: "Verify correctness", memoryChange: "Bugs found and fixed", output: "Correct solution" },
    ],
    code: `// Mock Interview Self-Assessment Checklist:
// [ ] Did I understand the problem before coding?
// [ ] Did I ask about constraints and edge cases?
// [ ] Did I think aloud throughout?
// [ ] Did I start with brute force and optimize?
// [ ] Did I analyze time and space complexity?
// [ ] Was my code clean and well-named?
// [ ] Did I test with the given example?
// [ ] Did I check edge cases (empty, single, duplicates)?
// [ ] Could I explain my solution to a 10-year-old?
// [ ] Did I handle follow-up questions well?`,
    syntaxCard: { title: "SYNTAX: Mock Interview Tips", content: `// 45-min format: understand → examples → approach → code → test\n// Speak constantly: interviewers want your thought process\n// Practice: 2-3 mocks per week\n// Review: record and analyze each session` },
    mistakes: [
      { wrong: "Staying silent while thinking", correct: "Narrate your thought process aloud", explanation: "Interviewers can't read your mind. If you're silent for 5 minutes, they assume you're stuck. Always explain what you're thinking, even when exploring dead ends." },
    ],
    leetcode: { problem: "Practice: Pick a random medium problem, 45-minute timer", approach: "Simulate real interview: timer, no hints, think aloud.", dryRun: "Complete problem within 45 minutes with clear communication", code: "// The practice IS the preparation!", complexity: "O(45 minutes)" },
    checkpoint: { question: "What should you do when stuck during an interview?", options: ["Stay silent and think harder", "Say you're stuck and ask for a hint", "Give up", "Start coding randomly"], answer: 1 }
  }
};

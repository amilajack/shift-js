var expect = require('chai').expect;
var api = require('../../transpiler/api.js');
var compile = api.compile;

var removeIndentation = function(str) {
  return str.replace(/\n\s*/gm, "\n").replace(/\s*/, "");
};

describe('End to End: Third Milestone', function() {
  describe('Functions', function() {

    xit('should handle function declaration and invocation with no spacing and with var in function parameters', function() {
      input = String.raw`func someFunction(var a: Int) -> Int {
                              a = a + 1;
                              return a;
                          }
                          someFunction(5);`;
      output = `var someFunction = function(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle function declaration and invocation with no spacing', function() {
      input = String.raw`func someFunction(a: Int)->Int{
                                let a = a + 1;
                                return a
                            }
                            someFunction(5);`;
      output = `var someFunction = function(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle function declaration and invocation with spaces between each part of the declaration', function() {
      input = String.raw`func someFunction (a: Int) -> Int {
                              let a = a + 1;
                              return a
                          }
                          someFunction(5);`
      output = `var someFunction = function(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle function declaration and invocation with no space after the function name', function() {
      input = String.raw`func someFunction(a: Int) -> Int {
                                        let a = a + 1;
                                        return a
                                    }
                                    someFunction(5);`;
      output = `var someFunction = function(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle function declaration and invocation with no space after the parameter declaration', function() {
      input = String.raw`func someFunction(a: Int)-> Int {
                              let a = a + 1;
                              return a
                          }
                          someFunction(5);`
      output = `var someFunction = function(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle function declaration and invocation with erratic spacing', function() {
      input = String.raw`func  someFunction(a: Int)           ->  Int{
                              let a = a +               1;
                              return                                  a
                          }
                          someFunction           (5)       ;`;
      output = `var someFunction = function(a) {
                  a = a + 1;
                  return a;
                }
                someFunction(5);`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that return strings', function() {
      input = String.raw`func sayHelloWorld() -> String {
                             return "hello, world"
                         }`;
      output = `var sayHelloWorld = function() {
                  return "hello, world"
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions with an input that return strings', function() {
      input = String.raw`func sayHello(personName: String) -> String {
                            let greeting = "Hello, " + personName + "!"
                            return greeting
                        }`;
      output = `var sayHello = function(personName) {
                  var greeting = "Hello, " + personName + "!"
                  return greeting
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that have if else statements that use curly braces and have a return value', function() {
      input = String.raw`func sayHello(alreadyGreeted: Bool) -> String {
                              if alreadyGreeted {
                                  return "blah"
                              } else {
                                  return "hello"
                              }
                          }
                          sayHello(true)`;
      output = `var sayHello = function(alreadyGreeted) {
                  if (alreadyGreeted) {
                    return "blah"
                  } else {
                    return "hello"
                  }
                }
                sayHello(true)`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle nested functions with function invocation', function() {
      input = String.raw`func sayHello(firstName: String, lastName: String) -> String {
                  func giveString() -> String {
                    return firstName + " " + lastName
                  }
                  return giveString()
              }`;
      output = `var sayHello = function(firstName, lastName) {
                  var giveString = function() {
                    return firstName + " " + lastName
                  }
                  return giveString()
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions with string interpolation', function () {
      input = String.raw`func greet(name: String, day: String) -> String {
                      return "Hello \(name), today is \(day)."
                  }
                  greet("Bob", day: "Tuesday")`;
      output = `var greet = function(name, day) {
                  return "Hello " + name + ", today is " + day + "."
                }
                greet("Bob", "Tuesday")`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions with many arguments', function () {
      input = String.raw`func addSevenInts(first: Int, second: Int, third: Int, fourth: Int, fifth: Int, sixth: Int, seventh: Int) -> Int {
                        let sum = first + second + third + fourth + fifth + sixth + seventh
                        return sum
                    }
                    addSevenInts(143242134, second: 34543, third: 4, fourth: 6, fifth: 0, sixth: 56, seventh: 5)`;
      output = `var addSevenInts = function(first, second, third, fourth, fifth, sixth, seventh) {
                  sum = first + second + third + fourth + fifth + sixth + seventh
                  return sum
                }
                addSevenInts(143242134, 34543, 4, 6, 0, 56, 5)`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle function invocations with internal parentheses', function () {
      input = String.raw`func addOne(input: Int) -> Int {
                              return input + 1
                          }
                          addOne(((17 * 4) - 3) * 5)`;
      output = `var addOne = function(input) {
                  return input + 1
                }
                addOne(((17 * 4) - 3) * 5)`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that return tuples', function () {
      input = String.raw`func returnTuple(num: Int) -> (plusFive: Int, timesFive: Int) {
                      let plusFiveResult = num + 5
                      let timesFiveResult = num * 5
                      return (plusFiveResult, timesFiveResult)
                  }
                  returnTuple(5)`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that return tuples with mixed values', function () {
      input = String.raw`func nameAndAge(name: String, age: Int) -> (name: String, age: Int) {
                        return (name, age)
                    }
                    let person = nameAndAge("Steve", age: 45)`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions with for loops, if and else if statments, and native count methods', function () {
      input = String.raw`func minMax(array: [Int]) -> (min: Int, max: Int) {
                  var currentMin = array[0]
                  var currentMax = array[0]
                  for value in array[1..<array.count] {
                      if value < currentMin {
                          currentMin = value
                      } else if value > currentMax {
                          currentMax = value
                      }
                  }
                  return (currentMin, currentMax)
              }`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions with for loops and if and else if statments', function () {
      input = String.raw`func minMax(array: [Int]) -> (min: Int, max: Int) {
                var currentMin = array[0]
                var currentMax = array[0]
                for value in array[1..<2] {
                    if value < currentMin {
                        currentMin = value
                    } else if value > currentMax {
                        currentMax = value
                    }
                }
                return (currentMin, currentMax)
            }`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that have variadic parameters', function () {
      input = String.raw`func sumOf(numbers: Int...) -> Int {
                      var sum = 0
                      for number in numbers {
                          sum += number
                      }
                      return sum
                  }
                  sumOf(1,2,3)`;
      output = `var sumOf = function() {
                  var numbers = Array.prototype.slice.call(arguments);
                  var sum = 0;
                  for (number in numbers) {
                    sum += number
                  }
                  return sum
                }
                sumOf(1,2,3)`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that return functions where the return function is specified within parentheses', function () {
      input = String.raw`func makeIncrementer() -> ((Int) -> Int) {
                          func addOne(number: Int) -> Int {
                              return 1 + number
                          }
                          return addOne
                      }`;
      output = `var makeIncrementer = function() {
                  var addOne = function(number) {
                    return 1 + number
                  }
                  return addOne
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that return functions where the return function is specified without parentheses', function () {
      input = String.raw`func makeIncrementer() -> (Int) -> Int {
                          func addOne(number: Int) -> Int {
                              return 1 + number
                          }
                          return addOne
                      }`;
      output = `var makeIncrementer = function() {
                  var addOne = function(number) {
                    return 1 + number
                  }
                  return addOne
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that take a function specified with parentheses as an argument', function () {
      input = String.raw`func any(list: [Int], condition: ((Int) -> Bool)) -> Bool {
                            for item in list {
                                if condition(item) {
                                    return true
                                }
                            }
                            return false
                        }`;
      output = `var any = function(list, condition) {
                  for (item in list) {
                    if (condition(item)) {
                      return true
                    }
                  }
                  return false
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions that take a function specified without parentheses as an argument', function () {
      input = String.raw`func any(list: [Int], condition: (Int) -> Bool) -> Bool {
                            for item in list {
                                if condition(item) {
                                    return true
                                }
                            }
                            return false
                        }`;
      output = `var any = function(list, condition) {
                  for (item in list) {
                    if (condition(item)) {
                      return true
                    }
                  }
                  return false
                }`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle functions whose invocation contains string interpolation that contains a function invocation', function () {
      input = String.raw`func returnWorld() -> String {
                            return "World"
                        }
                        func printInput(input: String) {
                            print(input)
                        }
                        printInput("Hello, \(returnWorld())!")`;
      output = `var returnWorld = function() {
                  return "World"
                }
                var printInput = function(input) {
                  print(input)
                }
                printInput("Hello, " + returnWorld() + "!")`;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  xdescribe('Classes and Stuctures', function () {

    xit('should handle basic definitions of classes and structs', function () {
      input = String.raw`class VideoMode {
                          var interlaced = false
                          var frameRate = 0.0
                      }
                      struct Resolution {
                          var width = 0
                          var height = 0
                      }`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle basic initialization of classes and structs', function () {
      input = String.raw`class VideoMode {
                   var interlaced = false
                   var frameRate = 0.0
                }
                struct Resolution {
                    var width = 0
                    var height = 0
                }
                let someVideoMode = VideoMode()
                let someResolution = Resolution();`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle basic property access via dot notation', function () {
      input = String.raw`class VideoMode {
                           var interlaced = false
                           var frameRate = 0.0
                        }
                        struct Resolution {
                            var width = 0
                            var height = 0
                        }
                        let someVideoMode = VideoMode()
                        let someResolution = Resolution();

                        let someFrameRate = someVideoMode.frameRate;
                        let someWidth = someResolution.width`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle basic memberwise initialization', function () {
      input = String.raw`struct Resolution {
                          var width = 0
                          var height = 0
                      }

                      let someResolution = Resolution(width: 640, height: 480)`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle complex memberwise initialization with internal parentheses', function () {
      input = String.raw`var resolutionHeight = 480
                        struct Resolution {
                            var width = 0
                            var height = 0
                        }

                        let someResolution = Resolution(width: ((50 * 2) * 6) + 40, height: resolutionHeight)`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle complex memberwise initialization with string interpolation that contains a function invocation', function () {
      input = String.raw`struct Greeting {
                          var greeting = ""
                      }
                      func returnWorld() -> String {
                          return "World"
                      }
                      var helloWorld = Greeting(greeting: "Hello, \(returnWorld())!")`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle variable and constant stored properties', function () {
      input = String.raw`struct FixedLengthRange {
                            var firstValue: Int
                            let length: Int
                        }
                        let rangeOfOneHundred = FixedLengthRange(firstValue: 1, length: 100)`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle properties of all kinds', function () {
      input = String.raw`class Medley {
                    var a = 1
                    var b = "hai, world"
                    let c = true
                    /* Comment 1

                    */ var d = 1 // Comment 2
                    var e = ["Eggs", "Milk", "Bacon"];
                    var f = ["one": 1, "two": 2, "three": 3]
                    let http200Status = (statusCode: 200, description: "OK")
                    var g = 5 + 6 / 4 - (-16 % 4.2) * 55
                    let h = 6 != 9
                    var i = "Stephen" + " " + "Tabor" + "!"
                }`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle basic class instance method definitions, and their invocation', function () {
      input = String.raw`class Counter {
                            var total = 0
                            func increment() {
                                ++total
                            }
                            func incrementBy(amount: Int) {
                                total += amount
                            }
                            func reset() {
                                total = 0
                            }
                        }
                        var someCounter = Counter()
                        someCounter.incrementBy(5)`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle basic class instance method definitions with multiple parameter names, and their invocation', function () {
      input = String.raw`class Counter {
                            var total = 0
                            func increment() {
                                ++total
                            }
                            func incrementBy(amount: Int, numberOfTimes: Int) {
                                    total += amount * numberOfTimes
                            }
                            func reset() {
                                total = 0
                            }
                        }
                        var someCounter = Counter()
                        someCounter.incrementBy(50, numberOfTimes: 10)
                        someCounter.total`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle basic instance method definitions that use self, and their invocation', function () {
      input = String.raw`class Counter {
                            var total = 0
                            func increment() {
                                ++self.total
                            }
                            func incrementBy(amount: Int) {
                                self.total += amount
                            }
                            func reset() {
                                self.total = 0
                            }
                        }
                        var someCounter = Counter()
                        someCounter.incrementBy(5)`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle basic struct mutating method definitions', function () {
      input = String.raw`struct Counter {
                            var total = 0
                            mutating func increment() {
                                ++total
                            }
                            mutating func incrementBy(amount: Int) {
                                total += amount
                            }
                            mutating func reset() {
                                total = 0
                            }
                        }`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle basic struct mutating methods that assign to self', function () {
      input = String.raw`struct Counter {
                            var total = 0
                            mutating func increment() {
                                self = Counter(total: ++total)
                            }
                        }`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle type methods declared with the static or class keyword', function () {
      input = String.raw`class ParentClass {
                            static func returnTen() -> Int {
                                return 10
                            }
                            class func returnString() -> String {
                                return "my string"
                            }
                        }
                        ParentClass.returnTen()
                        ParentClass.returnString()`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle basic class inheritance', function () {
      input = String.raw`class SuperClass {
                            var a = 0
                            var b = 1
                            func incrementA() {
                                ++a
                            }
                            static func returnTen() -> Int {
                                return 10
                            }
                            class func returnString() -> String {
                                return "my string"
                            }
                        }
                        class SubClass: SuperClass {
                            var c = 2
                        }`
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle methods declared as final methods and methods that override inherited methods', function () {
      input = String.raw`class SuperClass {
                          var a = 0
                          var b = 1
                          func incrementA() {
                              ++a
                          }
                          static func returnTen() -> Int {
                              return 10
                          }
                          final func returnString() -> String {
                              return "my string"
                          }
                      }
                      class SubClass: SuperClass {
                          override func incrementA() {
                              a++
                          }
                      }`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xit('should handle class declaration, initialization, property value lookups, and method calls with erratic spacing and inconsistent use of semi-colons', function () {
      input = String.raw`       class    SuperClass            {    var a = 0

                       var     b = 1   ;
                           func incrementA(){
                               ++a
                                                            }
                           static       func returnTen() -> Int {
                               return 10
                       }
                                                 final func returnString()-> String     {
                               return "my string"
                            }
                       }
                       class  SubClass :  SuperClass {
                           override func  incrementA() {
                               a++ ;
                           }
                       }
                        var  someSuper            = SuperClass  ()

                               someSuper.a         ;someSuper.returnString() ;
                              `;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });
  });

  xdescribe('Native Methods and Type Properties', function () {

    xit('should handle calls to print', function () {
      input = String.raw`var name = "Joe"
                       var arr = [1,2]
                       var tup = (1,2)
                       print(name)
                       print("Hello, \(name)")
                       print(5 * (1 + 1))
                       print(arr[1])
                       print(tup.0)`;
      output = ``;
      expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
    });

    xdescribe('Range Operations', function () {

      xit('should handle closed ranges', function () {
        input = String.raw`var a = 1...5`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle decimal ending in 0 closed ranges', function () {
        input = String.raw`var a = 1.0...5.0`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle random decimal closed ranges', function () {
        input = String.raw`var a = 1.2...5.3`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle half-open ranges', function () {
        input = String.raw`var b = 1..<5`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle decimal ending in 0 half-open ranges', function () {
        input = String.raw`var a = 1.0..<5.0`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle random decimal half-open ranges', function () {
        input = String.raw`var a = 1.2..<5.3`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle all ranges', function () {
        input = String.raw`var a = 1...5; var b = 2..<6`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle ranges delimited by identifiers', function () {
        input = String.raw`let start = 0; let end = 10; let range = start..<end; let fullRange = start...end;`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });
    });

    xdescribe('String Properties and Methods', function () {

      xit('should handle the String characters property', function () {
        input = String.raw `var s = "my string, 123!"
                            for c in s.characters {
                                print(c)
                            }`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle the String count property', function () {
        input = String.raw `var s = "my string, 123!"
                            let fifteen = s.characters.count`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      it('should handle the string isEmpty property', function () {
        input = String.raw `var s: String = ""
                            s.isEmpty`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle the String append method', function () {
        input = String.raw `var s = "my string, 123!"
                            var addChar: Character = "!"
                            s.append(addChar)`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle the String indices and their associated methods', function () {
        input = String.raw`var s = "my string, 123!"
                           var zero = s.startIndex
                           var one = s.startIndex.successor()
                           var two = s.startIndex.advancedBy(2)
                           var m = s[s.startIndex]
                           var y = s[s.startIndex.advancedBy(1)]
                           var fifteen = s.endIndex
                           var fourteen = s.endIndex.predecessor()
                           var bang = s[s.endIndex.predecessor()]`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle the String methods for inserting and removing characters', function () {
        input = String.raw`var greeting = "World"
                            var firstPart = "Hello, "
                            greeting.insert("!", atIndex: greeting.endIndex)
                            greeting.insertContentsOf(firstPart.characters, at: greeting.startIndex)
                            greeting.removeAtIndex(greeting.endIndex.predecessor())
                            var range = greeting.startIndex...greeting.startIndex.advancedBy(6)
                            greeting.removeRange(range)`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle the has prefix and has suffix string methods', function () {
        input = String.raw `var famousAuthor = "F. Scott Fitzgerald"
                            print(famousAuthor.hasPrefix("F. Scott"))
                            var famousDriver = "Dale Earnhardt, Jr."
                            print(famousDriver.hasSuffix("Jr."))`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });
    });

    xdescribe('Collection Properties and Methods', function () {

      xit('should handle the array append method', function () {
        input = String.raw `var arr = [1,2]
                            arr.append(3)`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle the array count property', function () {
        input = String.raw `var arr = [1,2]
                            arr.count`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle the array isEmpty property', function () {
        input = String.raw `var arr = [Int]()
                            arr.isEmpty`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle array initialization with a default value', function () {
        input = String.raw `var arrOfThreeZeros = [Int](count: 3, repeatedValue: 0)`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle the array insertion and removal methods', function () {
        input = String.raw `var arr = [1,2,4,8,5,7]
                            arr.insert(3, atIndex: 2)
                            var eight = arr.removeAtIndex(4)
                            arr.removeLast()
                            var arrTwo = [6,7,8,9,10]
                            arr.insertContentsOf(arrTwo, at: 5)
                            var one = arr.removeFirst()
                            arr.removeAll()`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle subscript syntax ranges to change many array values where replacement array has different length than range', function () {
        input = String.raw `var arr = [1,2,3,4,5,6,7]
                            arr[0...3] = [0]
                            arr[0..<9] = [5,6,7]`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should the dictionary count property', function () {
        input = String.raw `var d = ["array1": [1,2,3], "array2": [4,5,6]]
                            d.count`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should the dictionary update value method', function () {
        input = String.raw `var d = ["array1": [1,2,3], "array2": [4,5,6]]
                            d.updateValue([1], forKey: "array1")`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should the dictionary remove value for key method', function () {
        input = String.raw `var d = ["array1": [1,2,3], "array2": [4,5,6]]
                            d.removeValueForKey("array1")`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });
    });

    xdescribe('Basic tests', function () {

      xit('should handle FizzBuzz example with ranges, nested control flow, and native method invocations', function () {
        input = String.raw `let range = 1...100
                            var results = [String]()
                            for i in range {
                                if i % 3 == 0 {
                                    if i % 5 == 0 {
                                        results.append("FizzBuzz")
                                    } else {
                                        results.append("Fizz")
                                    }
                                } else if i % 5 == 0 {
                                    results.append("Buzz")
                                } else {
                                    results.append(String(i))
                                }
                            }
                            print(results)`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });

      xit('should handle FizzBuzz as a function with ranges, nested control flow, and native method invocations', function () {
        input = String.raw `func fizzBuzz(start: Int, end: Int) {
                                let range = start...end
                                for i in range {
                                    var output = ""
                                    if i % 3 == 0 {
                                        output += "Fizz"
                                    }
                                    if i % 5 == 0 {
                                        output += "Buzz"
                                    }
                                    if output.isEmpty {
                                        print(i)
                                    } else {
                                        print(output)
                                    }
                                }
                            }

                            fizzBuzz(1, end: 100)`;
        output = ``;
        expect(removeIndentation(compile(input))).to.equal(removeIndentation(output));
      });
    });
  });
});

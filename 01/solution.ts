import fs from 'fs'

function loadAndSplitData(){
//load the file
const inputFile = fs.readFileSync(`${__dirname}/input.txt`, {encoding: 'utf-8'})
//split the input by line
const split = inputFile.split('\n')
return split
}

function partOne(){
    const lines = loadAndSplitData()
    //Loop through each line and return an array of the numbers in the line. If there are no numbers in a line then return an empty array.
    const inputNumbers = lines.map(line => line.match(/\d+/g) ?? [])
    //Since the numbers on each line are a string, we can safely smush them all together and then take the first and last value
    const numbersPerLine = inputNumbers.map(line => line.reduce((acc, val) => acc+val))
    //Now take the first and last number, convert it to a number and store it so we can add them both together. If there is only 1 number it will be repeated per the example.
    const firstAndLastNumber = numbersPerLine.map(line => Number(line[0]+line.slice(-1)))
    // //Finally get the sum of all of the lines added together for the challenge result
    const result = firstAndLastNumber.reduce((acc, val) => acc + val);
    console.log(result)
}

partOne();

function partTwo() {
    //load the lines
    const lines = loadAndSplitData();
    //forward looking regex, this is because some values are like: eightwoone which needs to be parsed as 821.
    const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/gm
    //create an object that translates words to numbers
    const wordsToNumbers: {[number: string]: number} = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    }
    //loop through each line, pull the matches out of the regex, take the first and last match
    const firstAndLastNumber = lines.map(line => {
        const matches = [...line.matchAll(regex)].map(match => {
            //check if our match is a digit
            if((/\d/.test(match[1]) === true)) {
                return Number(match[1])
            } else {
                return wordsToNumbers[match[1]]
            }
        })
        return Number(`${matches[0]}${matches.slice(-1)}`)
    })
    //Finally get the sum of all of the lines added together for the challenge result
    console.log(firstAndLastNumber)
    const result = firstAndLastNumber.reduce((acc,val) => acc+val)
    console.log(result)
}
partTwo();
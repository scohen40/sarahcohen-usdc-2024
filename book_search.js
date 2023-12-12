/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    //result variable to contain all the lines that contain the search term
    var result = {
        "SearchTerm": "",
        "Results": []
    };
    //check that there are books to look through in the scannedTextObj, before searching
    if (scannedTextObj.length < 1) {
        console.log("NO BOOKS SCANNED");
        return result;
    } 
    
    //set the SearchTerm value
    result["SearchTerm"] = searchTerm; 
    
    //loop through the indices of the book objects in the scannedTextObj array 
    for (let bookIndex = 0; bookIndex < scannedTextObj.length; bookIndex++) {
        //get the book object at bookIndex
        const book = scannedTextObj[bookIndex];
        //get the book object's content array which each contains a line of text
        const content = book["Content"];
        //loop through the indices of the line objects in the book's Content array if it's not empty
        if (content.length >= 1) {
            for (let contentIndex = 0; contentIndex < content.length; contentIndex++) {
                //get the line object at contentIndex
                const line = content[contentIndex];
                //get the text of the line
                const text = line["Text"];
                //if the search term is in the line of text create a new line object and add it to the results
                // FUTURE: if multiple results in one line would require multiple entries, I would implement a while loop and look for every occurance of the search term character by character in the text, instead of using the includes() function
                if (text.includes(searchTerm)) { 
                    var lineFound = {
                        "ISBN": book["ISBN"],
                        "Page": line["Page"],
                        "Line": line["Line"]
                    };
                    result["Results"].push(lineFound);
                }  
            } 
        } else {
            console.log( "ISBN - " + book["ISBN"] + ": NO LINED SCANNED");
        }
    }
    
    return result;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const searchTerm1 = "the";

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks(searchTerm1, twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks(searchTerm1, twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

export interface Country   {
    commonName: string;
    officialName: string;
    flagUrl: string;
    capital: string;
    region: string;
    subRegion: string;
    population: number;
}

export interface SearchResult {
    commonName:{
        data: string;
        start: number;
        stop: number;
    },
    officialName:{
        data: string;
        start: number;
        stop: number;
    };
    flagUrl: {
        data: string;
        start: number;
        stop: number;
    };
    capital: {
        data: string;
        start: number;
        stop: number;
    };
    region: {
        data: string;
        start: number;
        stop: number;
    };
    subRegion: {
        data: string;
        start: number;
        stop: number;
    };
    population: {
        data: string;
        start: number;
        stop: number;
    };
}

async function getCountries(): Promise <any[] | []> {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if(!response.ok){
            //retry the response but for now log
            throw new Error(response.statusText);

        }
        const data = await response.json(); 
        return data;
    }
    catch(err){
        console.log(err);
        // return an empty array
        return [];
    }
}

export async function processCountries():  Promise <Country[]> {
    let countries: Country[] = [];
    const fullCountries = await getCountries();
    fullCountries.forEach((country: any) => {   
        countries.push({
            commonName: country.name.common,
            officialName: country.name.official,
            flagUrl: country.flags.svg,
            capital: "capital" in country ? country.capital[0] : "NA",
            region: country.region,
            subRegion: country.subregion,
            population: country.population
    })
}
);
 return countries;
} 



export function search(unfilteredCountries: Country[], searchTerm:string): SearchResult[] { 
    const results:SearchResult[] =[];
    unfilteredCountries.forEach(
        // process every country and populate the searchResult
        (country)=> {
            // keeps track of the number of fields that match for a country
            let matches = 0;
            let res: SearchResult = {
                commonName: { data: "", start: -1, stop: -1 },
                officialName: { data: "", start: -1, stop: -1 },
                capital: { data: "", start: -1, stop: -1 },
                region: { data: "", start: -1, stop: -1 },
                subRegion: { data: "", start: -1, stop: -1 },
                population: { data: "", start: -1, stop: -1 },
                flagUrl: {data: "", start: -1, stop: -1}
            };
            for(const key in country){
                // make sure it contains that property
                if(country.hasOwnProperty(key)){
                    const value = country[key as keyof Country];
                    let index: number;
                    switch(key){
                        case "commonName":
                            res.commonName.data = value.toString(); 
                            index = value.toString().toLowerCase().indexOf(searchTerm);
                            // if a substring matches then inc matches and update res
                            if(index !== -1){
                                matches++;
                                res.commonName.start = index;
                                res.commonName.stop = index + searchTerm.length;
                                console.log(value);
                            }else {
                                res.commonName.start = index;
                                res.commonName.stop = index;
                            }
                            break;
                        case "officialName":
                            const officialName = res.officialName;
                            officialName.data = value as string; 
                            index = value.toString().toLowerCase().indexOf(searchTerm)
                            // if a substring matches then inc matches and update res
                            if(index !== -1){
                                matches++;
                                officialName.start = index;
                                officialName.stop = index + searchTerm.length;
                            }else {
                                officialName.start = index;
                                officialName.stop = index;
                            }
                            break;

                        case "capital":
                            const capital = res.capital;
                            capital.data = value as string; 
                            index = value.toString().toLowerCase().indexOf(searchTerm)
                            // if a substring matches then inc matches and update res
                            if(index !== -1){
                                matches++;
                                capital.start = index;
                                capital.stop = index + searchTerm.length;
                            }else {
                                capital.start = index;
                                capital.stop = index;
                            }
                            break;

                        case "region":
                            const region = res.region;
                            region.data = value as string; 
                            index = value.toString().toLowerCase().indexOf(searchTerm)
                            // if a substring matches then inc matches and update res
                            if(index !== -1){
                                matches++;
                                region.start = index;
                                region.stop = index + searchTerm.length;
                            }else {
                                region.start = index;
                                region.stop = index;
                            }
                            break;

                        case "subRegion":
                            const subRegion = res.subRegion;
                            subRegion.data = value as string; 
                            index = value.toString().toLowerCase().indexOf(searchTerm)
                            // if a substring matches then inc matches and update res
                            if(index !== -1){
                                matches++;
                                subRegion.start = index;
                                subRegion.stop = index + searchTerm.length;
                            }else {
                                subRegion.start = index;
                                subRegion.stop = index;
                            }
                            break;

                        case "population":
                            const population = res.population;
                            population.data = value as string; 
                            index = population.data.indexOf(searchTerm)
                            // if a substring matches then inc matches and update res
                            if(index !== -1){
                                matches++;
                                population.start = index;
                                population.stop = index + searchTerm.length;
                            }else {
                                population.start = index;
                                population.stop = index;
                            }
                            break;
                    }
                    return 
                }
            }
            if(matches>0){
                results.push(res);
            }
        }
    );
    return results

}








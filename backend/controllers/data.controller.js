
// import { find, distinct, aggregate } from '../models/data.model.js';
import Data from "../models/data.model.js"

//getting data based on query
export const getData = async (req, res) => {

    try {
        //geeting query input
        const { sector, topic, region, pestle, source, country, end_year } = req.query;
        let pipeline = [];

        if (sector) {
            pipeline.push({ $match: { sector: { $regex: new RegExp(sector, "i") } } });
        }

        if (topic) {
            pipeline.push({ $match: { topic: { $regex: new RegExp(topic, "i") } } });
        }

        if (region) {
            pipeline.push({ $match: { region: { $regex: new RegExp(region, "i") } } });
        }
        if (pestle) {
            pipeline.push({ $match: { pestle: { $regex: new RegExp(pestle, "i") } } });
        }
        if (source) {
            pipeline.push({ $match: { source: { $regex: new RegExp(source, "i") } } });
        }

        if (country) {
            pipeline.push({ $match: { country: { $regex: new RegExp(country, "i") } } });
        }

        if (end_year) {
            pipeline.push({ $match: { end_year: parseInt(end_year) } });
        }

        //setting up the result
        let result;
        if (pipeline.length === 0) {
            result = await Data.find({}).limit(100);
        } else {
            result = await Data.aggregate(pipeline)
        }

        const totalIntensity = result.reduce((acc, item) => acc + item.intensity, 0);
        const totalRelevance = result.reduce((acc, item) => acc + item.relevance, 0);
        const totalLikelihood = result.reduce((acc, item) => acc + item.likelihood, 0);

        res.status(200).json(result, totalIntensity, totalRelevance, totalLikelihood);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



//getting data for filtering options
export const getDataForFilter = async (req, res) => {
    try {
        const { filtername } = req.query;
        let uniqueValues = await Data.distinct(filtername);
        let result = Object.values(uniqueValues);
        res.status(200).json({ result });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const getDataForGraph = async (req, res) => {
    try {
        const { sector, topic, region, pestle, source, country, end_year } = req.query;
        let pipeline = [];

        if (sector) {
            pipeline.push({ $match: { sector: { $regex: new RegExp(sector, "i") } } });
        }

        if (topic) {
            pipeline.push({ $match: { topic: { $regex: new RegExp(topic, "i") } } });
        }

        if (region) {
            pipeline.push({ $match: { region: { $regex: new RegExp(region, "i") } } });
        }

        if (pestle) {
            pipeline.push({ $match: { pestle: { $regex: new RegExp(pestle, "i") } } });
        }
        if (source) {
            pipeline.push({ $match: { source: { $regex: new RegExp(source, "i") } } });
        }

        if (country) {
            pipeline.push({ $match: { country: { $regex: new RegExp(country, "i") } } });
        }

        if (end_year) {
            pipeline.push({ $match: { end_year: parseInt(end_year) } });
        }

        //setting up the result
        let result;

        if (pipeline.length === 0) {
            result = await Data.find({})
        } else {
            result = await Data.aggregate(pipeline)
        }

        const totalIntensity = result.reduce((acc, item) => acc + (item.intensity || 0), 0);
        const totalRelevance = result.reduce((acc, item) => acc + (item.relevance || 0), 0);
        const totalLikelihood = result.reduce((acc, item) => acc + (item.likelihood || 0), 0);
        
        const resultArray = [
          parseFloat(totalIntensity.toFixed(2)),
          parseFloat(totalLikelihood.toFixed(2)),
          parseFloat(totalRelevance.toFixed(2))
        ];
        
        res.status(200).json(resultArray);
        

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}




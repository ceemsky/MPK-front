import swr from 'swr'
import React, {Component} from 'react';
import * as vehiclesData from '../data/vehicles.json'

const fetcher = (...args) => fetch(...args).then(resp => resp.json());

const dataUrl = 'http://91.223.13.70/internetservice/geoserviceDispatcher/services/vehicleinfo/vehicles';

class DataExtractor {
    data = [];
    constructor(isLoadData) {
        if(isLoadData){
            this.loadData();
            this.cleanData();
        }
    }
    loadData(){
        // let {data,error}= swr(dataUrl, {fetcher});
        // this.data =  data && !error ?JSON.parse(data) : [];
        this.data = vehiclesData.vehicles;
    }
    cleanData(){
        this.data = this.data.filter(function (value,index,arr){return !value.isDeleted});
    }
    getData(){
        return this.data;
    }
}
export default DataExtractor;
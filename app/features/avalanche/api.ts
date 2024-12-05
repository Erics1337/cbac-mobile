import { AvalancheForecast, Zone } from './types';

const API_BASE_URL = 'https://api.avalanche.org/v2/public';

export class AvalancheAPI {
  static async getForecast(zone: Zone): Promise<AvalancheForecast> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/product?type=forecast&center_id=${zone.center_id}&zone_id=${zone.id}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching avalanche forecast:', error);
      throw error;
    }
  }
}

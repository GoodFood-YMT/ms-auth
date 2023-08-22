import fetch from 'node-fetch'

export default class RestaurantApi {
  public static ENDPOINT = 'http://ms-restaurant.goodfood.svc.cluster.local/restaurants'

  public static async getRestaurant(restaurantId: string): Promise<{
    id: string
  } | null> {
    const response = await fetch(`${this.ENDPOINT}/${restaurantId}`)

    if (response.ok) {
      return response.json() as Promise<{ id: string }>
    }

    return null
  }
}

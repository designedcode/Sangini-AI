import { SKU } from '@/types'

export const skus: SKU[] = [
  {
    id: 'quick-chat',
    name: 'Quick Chat',
    price: 5,
    type: 'quick',
    description: '30 messages or 30 minutes',
    features: ['30 messages', 'OR 30 minutes'],
    messages: 30
  },
  {
    id: 'tonight-pass',
    name: 'Tonight Pass',
    price: 10,
    type: 'tonight',
    description: 'Unlimited text until midnight',
    features: ['Unlimited text', 'Until midnight'],
    messages: -1
  },
  {
    id: 'day-pass',
    name: 'Day Pass',
    price: 20,
    type: 'day',
    description: 'Unlimited text + 5 minutes calls',
    features: ['Unlimited text', '5 minutes calls', '3 voice notes'],
    messages: -1,
    minutes: 5
  },
  {
    id: 'week-pass',
    name: 'Week Pass',
    price: 50,
    type: 'week',
    description: '7 days unlimited + 15 minutes calls',
    features: ['7 days unlimited text', '15 minutes calls', 'Carryover within week'],
    messages: -1,
    minutes: 15
  },
  {
    id: 'monthly-pass',
    name: 'Monthly Ultimate',
    price: 199,
    type: 'month',
    description: '30 days unlimited + 30 minutes calls',
    features: ['30 days unlimited text', '30 minutes calls', 'Priority support'],
    messages: -1,
    minutes: 30
  },
  {
    id: 'call-3min',
    name: '3 Min Call',
    price: 10,
    type: 'topup',
    description: 'Add 3 minutes to your call balance',
    features: ['3 minutes voice calls'],
    minutes: 3
  },
  {
    id: 'call-8min',
    name: '8 Min Call',
    price: 20,
    type: 'topup',
    description: 'Add 8 minutes to your call balance',
    features: ['8 minutes voice calls'],
    minutes: 8
  },
  {
    id: 'call-25min',
    name: '25 Min Call',
    price: 50,
    type: 'topup',
    description: 'Add 25 minutes to your call balance',
    features: ['25 minutes voice calls'],
    minutes: 25
  },
  {
    id: 'images-3',
    name: '3 Images',
    price: 10,
    type: 'topup',
    description: 'Get 3 AI-generated images',
    features: ['3 AI images', 'High quality'],
    images: 3
  },
  {
    id: 'images-8',
    name: '8 Images',
    price: 20,
    type: 'topup',
    description: 'Get 8 AI-generated images',
    features: ['8 AI images', 'High quality'],
    images: 8
  },
  {
    id: 'images-25',
    name: '25 Images',
    price: 50,
    type: 'topup',
    description: 'Get 25 AI-generated images',
    features: ['25 AI images', 'High quality'],
    images: 25
  }
]

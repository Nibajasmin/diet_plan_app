from rest_framework.decorators import api_view
from rest_framework.response import Response
from groq import Groq
import json
import os
from datetime import datetime

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None


@api_view(['POST'])
def generate_diet_plan(request):
    print('=' * 50)
    print('🤖 AI Diet Plan Generator')
    print('Request:', request.data)
    print('=' * 50)

    try:
        plan_type = request.data.get('plan_type')
        region = request.data.get('region', 'south_india')

        if not GROQ_API_KEY:
            return Response({'error': 'GROQ_API_KEY not configured'}, status=500)

        if plan_type == 'budget':
            budget = request.data.get('budget_range', 'medium')
            prompt = f"You are an expert nutritionist. Create a 3-day budget diet plan for {budget} budget with {region} cuisine. Return JSON only."
        elif plan_type == 'climate':
            climate = request.data.get('climate', 'summer')
            prompt = f"You are an expert nutritionist. Create a 3-day climate diet plan for {climate} season with {region} cuisine. Return JSON only."
        elif plan_type == 'health':
            condition = request.data.get('health_condition', 'normal')
            goal = request.data.get('calorie_goal', 'maintenance')
            prompt = f"You are an expert nutritionist. Create a 3-day health diet plan for {condition} with {goal} goal and {region} cuisine. Return JSON only."
        else:
            return Response({'error': 'Invalid plan type'}, status=400)

        response = client.chat.completions.create(
            model='llama-3.3-70b-versatile',
            messages=[{'role': 'user', 'content': prompt}],
            temperature=0.7,
            max_tokens=4000
        )

        ai_response = response.choices[0].message.content
        ai_response = ai_response.strip()
        
        if ai_response.startswith('```json'):
            ai_response = ai_response[7:]
        if ai_response.startswith('```'):
            ai_response = ai_response[3:]
        if ai_response.endswith('```'):
            ai_response = ai_response[:-3]

        result = json.loads(ai_response)

        result['_meta'] = {
            'generated_by': 'Groq AI',
            'timestamp': datetime.now().strftime('%B %d, %Y'),
            'cuisine': region
        }

        return Response(result)

    except Exception as e:
        print(f'Error: {e}')
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def test_api(request):
    return Response({
        'status': 'success',
        'message': 'AI Diet Plan API is working!'
    })

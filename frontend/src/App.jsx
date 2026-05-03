// src/App.jsx - Complete Working Version
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Sparkles, ChefHat, Sun, CloudRain, Snowflake, 
  DollarSign, Heart, Activity, Calendar, Clock, 
  ShoppingBag, Leaf, Coffee, Moon, Utensils,
  TrendingUp, TrendingDown, Minus, Award, Globe,
  Compass, Crown, MapPin
} from 'lucide-react';

axios.defaults.baseURL = 'http://localhost:8000/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [planType, setPlanType] = useState(null);
  const [formData, setFormData] = useState({
    budget_range: 'medium',
    climate: 'summer',
    health_condition: 'normal',
    calorie_goal: 'maintenance',
    region: 'south_india'
  });

  const plans = [
    { id: 'budget', name: 'Budget Plan', icon: DollarSign, color: 'from-emerald-500 to-teal-600', description: 'Smart eating without breaking the bank' },
    { id: 'climate', name: 'Climate Plan', icon: Sun, color: 'from-amber-500 to-orange-600', description: 'Seasonal meals for your weather' },
    { id: 'health', name: 'Wellness Plan', icon: Heart, color: 'from-rose-500 to-pink-600', description: 'Tailored for your health goals' }
  ];

  // Regional Cuisine Options - FIXED (no Coconut icon)
  const regionOptions = [
    { value: 'kerala', label: 'Kerala', description: 'Coconut-based, seafood, spices', flag: '🌴' },
    { value: 'tamilnadu', label: 'Tamil Nadu', description: 'Tangy, spicy, rice-based', flag: '🍛' },
    { value: 'south_india', label: 'South Indian', description: 'Dosa, Idli, Sambar, Rasam', flag: '🥥' },
    { value: 'north_india', label: 'North Indian', description: 'Butter Chicken, Naan, Dal', flag: '🍞' },
    { value: 'western', label: 'Western', description: 'Greek Yogurt, Quinoa, Avocado Toast, Smoothie Bowls', flag: '🥑' }, 
    { value: 'arabian', label: 'Arabian', description: 'Hummus, Shawarma, Kebabs', flag: '🐪' },
    { value: 'european', label: 'European', description: 'Pasta, Pizza, Ratatouille', flag: '🍝' },
    { value: 'turkish', label: 'Turkish', description: 'Kebabs, Baklava, Pide', flag: '🥘' }
  ];

  const budgetOptions = [
    { value: 'low', label: 'Economical', range: '₹100-300/day', icon: TrendingDown },
    { value: 'medium', label: 'Balanced', range: '₹300-600/day', icon: Minus },
    { value: 'high', label: 'Premium', range: '₹600-1000/day', icon: TrendingUp }
  ];

  const climateOptions = [
    { value: 'summer', label: 'Summer', icon: Sun },
    { value: 'winter', label: 'Winter', icon: Snowflake },
    { value: 'rainy', label: 'Rainy', icon: CloudRain },
    { value: 'tropical', label: 'Tropical', icon: Sun },
    { value: 'cold', label: 'Cold', icon: Snowflake }
  ];

  const healthOptions = [
    { value: 'normal', label: 'General Wellness', icon: Activity },
    { value: 'diabetes', label: 'Diabetes Care', icon: Activity },
    { value: 'hypertension', label: 'Heart Health', icon: Heart },
    { value: 'thyroid', label: 'Thyroid Balance', icon: Activity }
  ];

  const calorieOptions = [
    { value: 'weight_loss', label: 'Weight Loss', icon: TrendingDown, target: '1,500-1,800 cal' },
    { value: 'maintenance', label: 'Maintenance', icon: Minus, target: '2,000-2,200 cal' },
    { value: 'weight_gain', label: 'Weight Gain', icon: TrendingUp, target: '2,500-2,800 cal' }
  ];

  const generatePlan = async () => {
    setLoading(true);
    try {
      const payload = { plan_type: planType, ...formData };
      console.log('Sending to AI:', payload);
      const response = await axios.post('/generate-diet-plan/', payload);
      console.log('AI Response:', response.data);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating plan: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-emerald-200 rounded-full animate-ping absolute"></div>
            <div className="w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ChefHat className="w-10 h-10 text-emerald-600" />
            </div>
          </div>
          <h3 className="mt-6 text-xl text-gray-600">AI is Creating Your Regional Plan...</h3>
          <p className="text-sm text-gray-400 mt-2">Drawing from {regionOptions.find(r => r.value === formData.region)?.label} cuisine</p>
        </div>
      </div>
    );
  }

  // Results Display
  if (result && result.daily_meal_plan) {
    const plan = result;
    const days = Object.keys(plan.daily_meal_plan);
    const regionLabel = regionOptions.find(r => r.value === plan.plan_info?.region)?.label || 'Regional';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
        <div className="container mx-auto px-6">
          <button
            onClick={() => { setResult(null); setPlanType(null); }}
            className="mb-6 text-gray-500 hover:text-gray-700 transition"
          >
            ← Back to Selection
          </button>

          {/* Header with Region Highlight */}
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{regionLabel} Cuisine</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-light mb-2">{plan.plan_info?.title || "Your Regional Wellness Journey"}</h1>
                <p className="text-emerald-100">{plan.plan_info?.subtitle || `Authentic ${regionLabel} flavors`}</p>
              </div>
              <div className="text-6xl">{regionOptions.find(r => r.value === plan.plan_info?.region)?.flag || '🍽️'}</div>
            </div>
            <div className="flex gap-4 mt-6 text-sm flex-wrap">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1">
                <Calendar className="w-4 h-4" />
                <span>3-Day Plan</span>
              </div>
              {plan.plan_info?.budget_level && (
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{plan.plan_info.budget_level} Budget</span>
                </div>
              )}
              {plan.plan_info?.season && (
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1">
                  <Sun className="w-4 h-4" />
                  <span>{plan.plan_info.season} Season</span>
                </div>
              )}
              {plan.plan_info?.condition && (
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1">
                  <Heart className="w-4 h-4" />
                  <span>{plan.plan_info.condition}</span>
                </div>
              )}
            </div>
          </div>

          {/* Daily Meal Plans */}
          {days.map((day, dayIdx) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIdx * 0.1 }}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-700 capitalize">{day.replace('_', ' ')}</h3>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    {plan.daily_meal_plan[day].breakfast && (
                      <div className="bg-amber-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee className="w-4 h-4 text-amber-600" />
                          <span className="text-sm font-medium text-amber-700">Breakfast</span>
                        </div>
                        <h4 className="font-medium text-gray-800">{plan.daily_meal_plan[day].breakfast.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{plan.daily_meal_plan[day].breakfast.description}</p>
                        <div className="mt-2 flex justify-between items-center text-sm">
                          <span className="text-emerald-600">{plan.daily_meal_plan[day].breakfast.calories} cal</span>
                          {plan.daily_meal_plan[day].breakfast.cost && <span className="text-gray-500">{plan.daily_meal_plan[day].breakfast.cost}</span>}
                        </div>
                        {(plan.daily_meal_plan[day].breakfast.season_benefit || plan.daily_meal_plan[day].breakfast.health_benefit) && (
                          <p className="text-xs text-amber-600 mt-2">✨ {plan.daily_meal_plan[day].breakfast.season_benefit || plan.daily_meal_plan[day].breakfast.health_benefit}</p>
                        )}
                      </div>
                    )}

                    {plan.daily_meal_plan[day].lunch && (
                      <div className="bg-green-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Utensils className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">Lunch</span>
                        </div>
                        <h4 className="font-medium text-gray-800">{plan.daily_meal_plan[day].lunch.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{plan.daily_meal_plan[day].lunch.description}</p>
                        <div className="mt-2 flex justify-between items-center text-sm">
                          <span className="text-emerald-600">{plan.daily_meal_plan[day].lunch.calories} cal</span>
                          {plan.daily_meal_plan[day].lunch.cost && <span className="text-gray-500">{plan.daily_meal_plan[day].lunch.cost}</span>}
                        </div>
                      </div>
                    )}

                    {plan.daily_meal_plan[day].dinner && (
                      <div className="bg-indigo-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Moon className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-medium text-indigo-700">Dinner</span>
                        </div>
                        <h4 className="font-medium text-gray-800">{plan.daily_meal_plan[day].dinner.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{plan.daily_meal_plan[day].dinner.description}</p>
                        <div className="mt-2 flex justify-between items-center text-sm">
                          <span className="text-emerald-600">{plan.daily_meal_plan[day].dinner.calories} cal</span>
                          {plan.daily_meal_plan[day].dinner.cost && <span className="text-gray-500">{plan.daily_meal_plan[day].dinner.cost}</span>}
                        </div>
                      </div>
                    )}

                    {plan.daily_meal_plan[day].snack && (
                      <div className="bg-rose-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="w-4 h-4 text-rose-600" />
                          <span className="text-sm font-medium text-rose-700">Snack</span>
                        </div>
                        <h4 className="font-medium text-gray-800">{plan.daily_meal_plan[day].snack.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{plan.daily_meal_plan[day].snack.description}</p>
                        <div className="mt-2 flex justify-between items-center text-sm">
                          <span className="text-emerald-600">{plan.daily_meal_plan[day].snack.calories} cal</span>
                          {plan.daily_meal_plan[day].snack.cost && <span className="text-gray-500">{plan.daily_meal_plan[day].snack.cost}</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Tips and Shopping Sections */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {plan.wellness_tips && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h3 className="font-medium text-gray-800">Wellness Tips</h3>
                </div>
                <ul className="space-y-2">
                  {plan.wellness_tips.map((tip, idx) => (
                    <li key={idx} className="text-gray-600">✨ {tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {plan.shopping_list && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-medium text-gray-800">Shopping List</h3>
                </div>
                <ul className="space-y-2">
                  {plan.shopping_list.map((item, idx) => (
                    <li key={idx} className="text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {plan.seasonal_foods && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="w-5 h-5 text-amber-600" />
                  <h3 className="font-medium text-gray-800">Seasonal Foods</h3>
                </div>
                <ul className="space-y-2">
                  {plan.seasonal_foods.map((food, idx) => (
                    <li key={idx} className="text-gray-600">🌱 {food}</li>
                  ))}
                </ul>
              </div>
            )}

            {plan.foods_to_eat && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-green-600" />
                  <h3 className="font-medium text-gray-800">Foods to Embrace</h3>
                </div>
                <ul className="space-y-2">
                  {plan.foods_to_eat.map((food, idx) => (
                    <li key={idx} className="text-gray-600">✅ {food}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Plan Selection Screen
  if (!planType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-gray-600">AI-POWERED PERSONALIZATION</span>
            </div>
            <h1 className="text-5xl font-light text-gray-800 mb-4">Your Wellness Journey</h1>
            <p className="text-xl text-gray-500">Let AI curate authentic regional diet plans for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setPlanType(plan.id)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 cursor-pointer transition-all hover:shadow-xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-500">{plan.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Form Screen with Region Selection
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <button onClick={() => setPlanType(null)} className="mb-6 text-gray-500 hover:text-gray-700 transition">
          ← Back to Plans
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className={`bg-gradient-to-r ${plans.find(p => p.id === planType).color} px-8 py-8 text-white`}>
            <h2 className="text-2xl font-light">Create Your {plans.find(p => p.id === planType).name}</h2>
            <p className="text-white/80 mt-2">Tell us about your preferences</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Regional Cuisine Selection - Always visible */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Select Your Preferred Cuisine
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {regionOptions.map((region) => (
                  <button
                    key={region.value}
                    onClick={() => setFormData({ ...formData, region: region.value })}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${formData.region === region.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="text-2xl mb-1">{region.flag}</div>
                    <div className="font-medium text-gray-800 text-sm">{region.label}</div>
                    <div className="text-xs text-gray-500 mt-1 hidden md:block">{region.description.split(',')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {planType === 'budget' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Budget Range</label>
                <div className="grid grid-cols-3 gap-3">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFormData({ ...formData, budget_range: opt.value })}
                      className={`p-4 rounded-xl border-2 transition-all ${formData.budget_range === opt.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                    >
                      <opt.icon className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                      <div className="font-medium text-gray-800">{opt.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{opt.range}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {planType === 'climate' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Climate</label>
                <div className="grid grid-cols-2 gap-3">
                  {climateOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFormData({ ...formData, climate: opt.value })}
                      className={`p-4 rounded-xl border-2 transition-all ${formData.climate === opt.value ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}
                    >
                      <opt.icon className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                      <div className="font-medium text-gray-800">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {planType === 'health' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Health Focus</label>
                  <div className="grid grid-cols-2 gap-3">
                    {healthOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setFormData({ ...formData, health_condition: opt.value })}
                        className={`p-4 rounded-xl border-2 transition-all ${formData.health_condition === opt.value ? 'border-rose-500 bg-rose-50' : 'border-gray-200'}`}
                      >
                        <opt.icon className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                        <div className="font-medium text-gray-800">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Calorie Goal</label>
                  <div className="grid grid-cols-3 gap-3">
                    {calorieOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setFormData({ ...formData, calorie_goal: opt.value })}
                        className={`p-4 rounded-xl border-2 transition-all ${formData.calorie_goal === opt.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                      >
                        <opt.icon className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                        <div className="font-medium text-gray-800 text-sm">{opt.label}</div>
                        <div className="text-xs text-gray-500">{opt.target}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <button
              onClick={generatePlan}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Generate My Regional AI Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
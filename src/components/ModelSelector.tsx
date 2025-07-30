import React, { useState, useMemo } from 'react';
import { FiSearch, FiStar, FiCode, FiEye, FiZap } from 'react-icons/fi';

interface ModelSelectorProps {
  models: string[];
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  models, 
  selectedModel, 
  onModelSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Categorize models based on their names
  const categorizedModels = useMemo(() => {
    const categories: Record<string, string[]> = {
      'OpenAI': models.filter(m => m.startsWith('openai/')),
      'Anthropic': models.filter(m => m.startsWith('anthropic/')),
      'Google': models.filter(m => m.startsWith('google/')),
      'Meta Llama': models.filter(m => m.startsWith('meta-llama/')),
      'Qwen': models.filter(m => m.startsWith('qwen/')),
      'DeepSeek': models.filter(m => m.startsWith('deepseek/')),
      'Mistral': models.filter(m => m.startsWith('mistralai/')),
      'Microsoft': models.filter(m => m.startsWith('microsoft/')),
      'Cohere': models.filter(m => m.startsWith('cohere/')),
      'Perplexity': models.filter(m => m.startsWith('perplexity/')),
      'Free Models': models.filter(m => m.includes(':free')),
      'Code Models': models.filter(m => 
        m.includes('code') || 
        m.includes('coder') || 
        m.includes('codellama') ||
        m.includes('codestral')
      ),
      'Vision Models': models.filter(m => 
        m.includes('vision') || 
        m.includes('vl') ||
        m.includes('firellava')
      ),
      'Other': models.filter(m => 
        !m.startsWith('openai/') &&
        !m.startsWith('anthropic/') &&
        !m.startsWith('google/') &&
        !m.startsWith('meta-llama/') &&
        !m.startsWith('qwen/') &&
        !m.startsWith('deepseek/') &&
        !m.startsWith('mistralai/') &&
        !m.startsWith('microsoft/') &&
        !m.startsWith('cohere/') &&
        !m.startsWith('perplexity/')
      )
    };

    // Remove empty categories
    Object.keys(categories).forEach(key => {
      if (categories[key].length === 0) {
        delete categories[key];
      }
    });

    return categories;
  }, [models]);

  // Filter models based on search and category
  const filteredModels = useMemo(() => {
    let modelsToShow = models;

    if (selectedCategory !== 'all') {
      modelsToShow = categorizedModels[selectedCategory] || [];
    }

    if (searchTerm) {
      modelsToShow = modelsToShow.filter(model =>
        model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return modelsToShow;
  }, [models, categorizedModels, selectedCategory, searchTerm]);

  const getModelIcon = (model: string) => {
    if (model.includes(':free')) return <FiStar className="w-3 h-3 text-green-500" />;
    if (model.includes('code') || model.includes('coder')) return <FiCode className="w-3 h-3 text-blue-500" />;
    if (model.includes('vision') || model.includes('vl')) return <FiEye className="w-3 h-3 text-purple-500" />;
    if (model.includes('turbo') || model.includes('flash')) return <FiZap className="w-3 h-3 text-yellow-500" />;
    return null;
  };

  const getModelDisplayName = (model: string) => {
    return model.replace(/^[^/]+\//, '').replace(/:free$/, ' (Free)');
  };

  const getModelDescription = (model: string) => {
    // Add brief descriptions for popular models
    const descriptions: Record<string, string> = {
      'openai/gpt-4o': 'Latest multimodal GPT-4 model',
      'openai/gpt-4o-mini': 'Faster, cost-effective GPT-4 variant',
      'anthropic/claude-3.5-sonnet': 'Best Claude model for most tasks',
      'qwen/qwen-2.5-coder-32b-instruct': 'Excellent for coding tasks',
      'qwen/qwen-2.5-coder-14b-instruct': 'Good coding model, smaller size',
      'qwen/qwen-2.5-coder-7b-instruct': 'Fast coding-focused model',
      'qwen/qwen3-coder:free': 'Latest Qwen coder model (free)',
      'qwen/qwen2.5-coder-1.5b-instruct:free': 'Lightweight coding model (free)',
      'meta-llama/llama-3.1-405b-instruct': 'Largest open-source model',
      'deepseek/deepseek-coder': 'Specialized for programming',
      'deepseek/deepseek-chat': 'General purpose conversational AI',
      'google/gemini-pro-1.5': 'Google\'s flagship model',
      'mistralai/mixtral-8x7b-instruct': 'High-quality mixture of experts',
      'perplexity/llama-3.1-sonar-large-128k-online': 'Real-time web search integration',
      'microsoft/wizardlm-2-8x22b': 'Microsoft\'s powerful instruction-following model',
      'cohere/command-r-plus': 'Cohere\'s advanced reasoning model',
      'nvidia/llama-3.1-nemotron-70b-instruct': 'NVIDIA-tuned Llama model'
    };

    return descriptions[model] || '';
  };

  const categories = ['all', ...Object.keys(categorizedModels)];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Models' : category}
            {category !== 'all' && (
              <span className="ml-1 text-xs opacity-75">
                ({categorizedModels[category]?.length || 0})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Model List */}
      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
        {filteredModels.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No models found matching your criteria
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredModels.map((model) => (
              <button
                key={model}
                onClick={() => onModelSelect(model)}
                className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${
                  selectedModel === model ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getModelIcon(model)}
                    <span className={`text-sm font-medium ${
                      selectedModel === model ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {getModelDisplayName(model)}
                    </span>
                  </div>
                  {model.includes(':free') && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Free
                    </span>
                  )}
                </div>
                {getModelDescription(model) && (
                  <p className="text-xs text-gray-500 mt-1">
                    {getModelDescription(model)}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Model Info */}
      {selectedModel && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center space-x-2">
            {getModelIcon(selectedModel)}
            <span className="text-sm font-medium text-blue-900">
              Selected: {getModelDisplayName(selectedModel)}
            </span>
          </div>
          {getModelDescription(selectedModel) && (
            <p className="text-xs text-blue-700 mt-1">
              {getModelDescription(selectedModel)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
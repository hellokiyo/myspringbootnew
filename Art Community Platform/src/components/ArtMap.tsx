import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { MapPin, Search, Filter, Heart, Camera } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArtWork {
  id: string;
  title: string;
  description: string;
  location: string;
  artist: string;
  likes: number;
  imageUrl: string;
  category: string;
  coordinates?: [number, number];
}

const sampleArtworks: ArtWork[] = [
  {
    id: '1',
    title: '희망의 벽화',
    description: '지역 주민들과 함께 그린 희망을 담은 벽화입니다.',
    location: '홍대입구역 2번 출구',
    artist: '김예술',
    likes: 24,
    imageUrl: 'https://images.unsplash.com/photo-1758030306457-e54f25fe4384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnQlMjBtdXJhbHxlbnwxfHx8fDE3NTg3NzQ3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: '벽화'
  },
  {
    id: '2',
    title: '조화로운 공간',
    description: '현대와 전통이 만나는 아름다운 조각 작품',
    location: '선정릉역 인근 공원',
    artist: '박조각',
    likes: 18,
    imageUrl: 'https://images.unsplash.com/photo-1713779490284-a81ff6a8ffae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NTg3NDI0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: '조각'
  },
  {
    id: '3',
    title: '커뮤니티의 힘',
    description: '마을 주민들이 함께 참여한 공동 작품',
    location: '마포구 합정동',
    artist: '합정동 주민들',
    likes: 31,
    imageUrl: 'https://images.unsplash.com/photo-1654870574819-ee447f65112d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjB3b3Jrc3BhY2UlMjBzdHVkaW98ZW58MXx8fHwxNzU4NzQzNjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: '설치미술'
  }
];

export function ArtMap() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [artworks, setArtworks] = useState(sampleArtworks);

  const categories = ['전체', '벽화', '조각', '설치미술', '거리예술'];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || artwork.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (id: string) => {
    setArtworks(prev => prev.map(artwork => 
      artwork.id === id 
        ? { ...artwork, likes: artwork.likes + 1 }
        : artwork
    ));
  };

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">우리 동네 예술 지도</h2>
            <p className="text-gray-600">보물찾기처럼 예술 작품을 발견해보세요</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Camera className="w-4 h-4 mr-2" />
            작품 등록하기
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="작품명, 위치, 설명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Map Placeholder */}
      <Card>
        <CardContent className="p-0">
          <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">인터랙티브 지도</h3>
              <p className="text-gray-500">클릭하여 주변 예술 작품을 탐색하세요</p>
              <div className="mt-4 flex justify-center space-x-2">
                {artworks.map((artwork, index) => (
                  <div
                    key={artwork.id}
                    className="w-4 h-4 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
                    style={{
                      position: 'relative',
                      left: `${(index - 1) * 20}px`,
                      top: `${(index % 2) * 10}px`
                    }}
                    title={artwork.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Artwork Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
              <ImageWithFallback
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90">
                  {artwork.category}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{artwork.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(artwork.id)}
                  className="p-1 h-auto"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="ml-1 text-sm">{artwork.likes}</span>
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-3">{artwork.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {artwork.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">작가: {artwork.artist}</span>
                  <Button variant="outline" size="sm">
                    상세보기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-500">다른 검색어를 시도해보세요</p>
        </div>
      )}
    </div>
  );
}
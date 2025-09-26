import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Heart, MessageCircle, Star, ShoppingCart, Calendar, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Artist {
  id: string;
  name: string;
  bio: string;
  speciality: string;
  rating: number;
  followers: number;
  location: string;
  profileImage: string;
  artworks: Artwork[];
  classes: Class[];
}

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  likes: number;
  available: boolean;
}

interface Class {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  maxStudents: number;
  currentStudents: number;
  schedule: string;
}

const sampleArtists: Artist[] = [
  {
    id: '1',
    name: '김예술',
    bio: '홍대 지역에서 20년간 활동해온 벽화 전문 아티스트입니다. 지역 주민들과 함께하는 공동체 예술을 추구합니다.',
    speciality: '벽화, 공공예술',
    rating: 4.8,
    followers: 234,
    location: '홍대입구',
    profileImage: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTg3NzQ4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artworks: [
      {
        id: '1',
        title: '희망의 벽화',
        description: '지역 주민들과 함께 그린 희망을 담은 벽화',
        price: '맞춤 견적',
        imageUrl: 'https://images.unsplash.com/photo-1758030306457-e54f25fe4384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnQlMjBtdXJhbHxlbnwxfHx8fDE3NTg3NzQ3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        likes: 45,
        available: true
      }
    ],
    classes: [
      {
        id: '1',
        title: '벽화 그리기 기초',
        description: '초보자를 위한 벽화 그리기 기초 수업',
        duration: '2시간',
        price: '50,000원',
        maxStudents: 8,
        currentStudents: 5,
        schedule: '매주 토요일 14:00'
      }
    ]
  },
  {
    id: '2',
    name: '박조각',
    bio: '현대와 전통이 조화된 조각 작품을 만드는 조각가입니다. 공공 공간의 예술성을 높이는 작업을 합니다.',
    speciality: '조각, 설치미술',
    rating: 4.9,
    followers: 189,
    location: '강남구',
    profileImage: 'https://images.unsplash.com/flagged/photo-1554757388-5982229b9ce7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMGNhbnZhcyUyMGFydHxlbnwxfHx8fDE3NTg3NzQ4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artworks: [
      {
        id: '2',
        title: '조화로운 공간',
        description: '현대와 전통이 만나는 아름다운 조각',
        price: '2,500,000원',
        imageUrl: 'https://images.unsplash.com/photo-1713779490284-a81ff6a8ffae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NTg3NDI0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        likes: 67,
        available: true
      }
    ],
    classes: [
      {
        id: '2',
        title: '도자기 만들기',
        description: '전통 도자기 기법을 배우는 수업',
        duration: '3시간',
        price: '75,000원',
        maxStudents: 6,
        currentStudents: 3,
        schedule: '매주 일요일 10:00'
      }
    ]
  }
];

export function ArtistProfiles() {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [activeTab, setActiveTab] = useState('profiles');

  if (selectedArtist) {
    return (
      <div className="space-y-6">
        {/* Artist Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedArtist(null)}
                className="mb-4"
              >
                ← 돌아가기
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <Avatar className="w-32 h-32 mx-auto md:mx-0">
                  <AvatarImage src={selectedArtist.profileImage} alt={selectedArtist.name} />
                  <AvatarFallback>{selectedArtist.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="md:w-2/3">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-2xl font-bold text-gray-900">{selectedArtist.name}</h1>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{selectedArtist.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary">{selectedArtist.speciality}</Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedArtist.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    팔로워 {selectedArtist.followers}명
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{selectedArtist.bio}</p>
                
                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Heart className="w-4 h-4 mr-2" />
                    팔로우
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    메시지
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artist Details */}
        <Tabs defaultValue="artworks" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="artworks">작품</TabsTrigger>
            <TabsTrigger value="classes">수업</TabsTrigger>
          </TabsList>

          <TabsContent value="artworks" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedArtist.artworks.map((artwork) => (
                <Card key={artwork.id} className="overflow-hidden">
                  <div className="aspect-square bg-gray-200">
                    <ImageWithFallback
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{artwork.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{artwork.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-purple-600">{artwork.price}</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4" />
                          {artwork.likes}
                        </Button>
                        <Button size="sm">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          구매
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="classes" className="mt-6">
            <div className="space-y-4">
              {selectedArtist.classes.map((classItem) => (
                <Card key={classItem.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{classItem.title}</h3>
                        <p className="text-gray-600 mb-4">{classItem.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-500">수업 시간</span>
                            <p className="font-medium">{classItem.duration}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">가격</span>
                            <p className="font-medium text-purple-600">{classItem.price}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">정원</span>
                            <p className="font-medium">{classItem.currentStudents}/{classItem.maxStudents}명</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">일정</span>
                            <p className="font-medium">{classItem.schedule}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          수업 신청
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">예술가 공간</h2>
            <p className="text-gray-600">지역 예술가들과 소통하고 작품을 만나보세요</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <User className="w-4 h-4 mr-2" />
            예술가 등록
          </Button>
        </div>
      </div>

      {/* Artist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleArtists.map((artist) => (
          <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedArtist(artist)}>
            <div className="aspect-video bg-gray-200 relative">
              <ImageWithFallback
                src={artist.profileImage}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-500 mr-1" />
                  <span className="text-xs font-medium">{artist.rating}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{artist.name}</h3>
                <Badge variant="outline" className="text-xs">{artist.speciality}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{artist.bio}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {artist.location}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {artist.followers}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">45+</div>
            <p className="text-gray-600">등록된 예술가</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">128</div>
            <p className="text-gray-600">판매 중인 작품</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">67</div>
            <p className="text-gray-600">진행 중인 수업</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}